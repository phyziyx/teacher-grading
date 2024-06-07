import express, { Request, Response } from 'express';
import { studentModel, questionModel, classModel, teacherModel, ratingModel, enrollmentModel, assignedModel } from './models';

const router = express.Router();

router.get('/students/', async (req: Request, res: Response) => {
	const students = await studentModel.find();
	res.send(students);
});

router.get('/students/:studentId', async (req: Request, res: Response) => {
	const studentId = Number(req.params.studentId);

	const enrollments = await enrollmentModel.find({ student_id: studentId });
	console.log('Enrollments:', enrollments);

	if (enrollments.length === 0) {
		return []; // No enrollments found for the student
	}

	const classIds = enrollments.map(enrollment => enrollment.class_id);

	// Verify if assignments exist for these classes
	const assignments = await assignedModel.find({ class_id: { $in: classIds } });
	console.log('Assignments:', assignments);

	if (assignments.length === 0) {
		return []; // No assignments found for these classes
	}

	const teacherIds = assignments.map(assignment => assignment.teacher_id);

	// Verify if teachers exist for these assignments
	const teachers = await teacherModel.find({ id: { $in: teacherIds } });
	console.log('Teachers:', teachers);

	if (teachers.length === 0) {
		return []; // No teachers found for these assignments
	}

	const ratings = await ratingModel.find({
		teacher_id: { $in: teacherIds },
		student_id: studentId
	});

	console.log(ratings);

	// Aggregation pipeline
	const teacherDetails = await enrollmentModel.aggregate([
		{
			$match: {
				student_id: studentId,
			},
		},
		{
			$lookup: {
				from: 'assigneds',
				localField: 'class_id',
				foreignField: 'class_id',
				as: 'assignments',
			},
		},
		{
			$unwind: '$assignments',
		},
		{
			$lookup: {
				from: 'teachers',
				localField: 'assignments.teacher_id',
				foreignField: 'id',
				as: 'teacherDetails',
			},
		},
		{
			$unwind: '$teacherDetails',
		},
		{
			$lookup: {
				from: 'ratings',
				let: { teacherId: '$teacherDetails.id' },
				pipeline: [
					{
						$match: {
							$expr: {
								$and: [
									{ $eq: ['$teacher_id', '$$teacherId'] },
									{ $eq: ['$student_id', studentId] }
								]
							}
						}
					}
				],
				as: 'ratings'
			},
		},
		{
			$group: {
				_id: '$teacherDetails.id',
				name: { $first: '$teacherDetails.name' },
				ratings: { $first: '$ratings' }
			},
		},
		{
			$project: {
				_id: 0,
				id: '$_id',
				name: 1,
				ratings: 1
			},
		},
	]);

	console.log('Aggregated Teachers:', teacherDetails);
	res.send(teacherDetails);
});

router.get('/teachers', async (req: Request, res: Response) => {
	const teachers = await teacherModel.find();
	res.json(teachers);
});

router.get('/questions/', async (req: Request, res: Response) => {
	const questions = await questionModel.find();
	res.json(questions);
});

// router.get('/assigned/:studentId', async (req: Request, res: Response) => {
// 	const studentId = req.params.studentId;
// 	const classes = await classModel.find({ students: studentId });
// 	const teacherIds = classes.map(cls => cls.teacher_id);
// 	const teachers = await teacherModel.find({ id: { $in: teacherIds } });
// 	res.json(teachers);
// });

router.get('/ratings/students/:studentId', async (req: Request, res: Response) => {
	const studentId = req.params.studentId;
	const ratings = await ratingModel.find({ student_id: studentId });
	res.json(ratings);
});

router.get('/ratings/teachers/:teacherId', async (req: Request, res: Response) => {
	const teacherId = req.params.teacherId;
	const ratings = await ratingModel.find({ teacher_id: teacherId });
	res.json(ratings);
});

router.put('/rate', async (req: Request, res: Response) => {
	const { student_id, teacher_id, question_id, grade } = req.body;

	const rating = await ratingModel.updateOne({
		student_id,
		teacher_id,
		question_id
	}, {
		grade
	}, {
		upsert: true
	});

	res.json(rating);
});

export default router;