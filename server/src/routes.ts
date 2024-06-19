import express, { Request, Response } from 'express';
import { studentModel, questionModel, classModel, teacherModel, ratingModel, enrollmentModel, assignedModel } from './models';

const router = express.Router();

router.get('/students', async (req: Request, res: Response) => {
	const students = await studentModel.find();
	res.send(students);
});

router.get('/students/:studentId', async (req: Request, res: Response) => {
	const studentId = Number(req.params.studentId);

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
				_id: false,
				id: '$_id',
				name: true,
				ratings: true
			},
		},
	]);

	res.send(teacherDetails);
});

router.get('/teachers', async (req: Request, res: Response) => {
	const teachers = await teacherModel.find();
	res.json(teachers);
});

router.get('/teachers/:teacherId', async (req: Request, res: Response) => {
	const teacherId = Number(req.params.teacherId);

	const reviews = await ratingModel.find({
		teacher_id: teacherId
	});

	res.send(reviews);
});

router.get('/classes/', async (req: Request, res: Response) => {
	const classes = await classModel.find();
	res.send(classes);
});

router.get('/classes/:teacherId', async (req: Request, res: Response) => {
	const teacherId = Number(req.params.teacherId);

	const classes = await classModel.aggregate([
		{
			$lookup: {
				from: 'assigneds',
				localField: 'id',
				foreignField: 'class_id',
				as: 'assigned',
				pipeline: [
					{
						$match: {
							teacher_id: teacherId
						}
					}
				]
			}
		},
		{
			$unwind: '$assigned'
		},
		{
			$project: {
				'assigned': false
			}
		}
	]);

	res.send(classes);
});

router.get('/questions/', async (req: Request, res: Response) => {
	const questions = await questionModel.find();
	res.json(questions);
});

router.get('/enrollments', async (req: Request, res: Response) => {
	const validateCategory = (category: string) => {
		category = Array.isArray(category) ? category[0] : category;
		const validCategories = ['student_id', 'regno', 'name'];
		if (!category || !validCategories.includes(category)) return 'student_id';
		return category;
	};

	const sort = (typeof req.query.sort !== 'string' ? 'asc' : req.query.sort.toLowerCase()) === 'desc' ? -1 : 1;
	const category = validateCategory(typeof req.query.category !== 'string' ? 'student_id' : req.query.category.toLowerCase());

	const enrollments = await studentModel.aggregate([
		{
			$lookup: {
				from: 'enrollments',
				localField: 'student_id',
				foreignField: 'student_id',
				as: 'enrollments',
			}
		},
		{
			$unwind: {
				path: '$enrollments',
				preserveNullAndEmptyArrays: true,
			}
		},
		{
			$lookup: {
				from: 'classes',
				localField: 'enrollments.class_id',
				foreignField: 'id',
				as: 'class'
			},
		},
		{
			$unwind: {
				path: '$class',
				preserveNullAndEmptyArrays: true,
			},
		},
		{
			$project: {
				_id: false,
				student_id: true,
				regno: true,
				name: true,
				enrollment: '$class',
			}
		},
		{
			$sort: {
				[category]: sort
			},
		},
	]);
	res.json(enrollments);
});

router.get('/reviews/', async (req: Request, res: Response) => {
	const { classId, teacherId } = req.query;

	if (!classId || !teacherId) {
		return res.status(400).json({
			message: 'missing teacherId or classId or both.'
		});
	}

	const studentsInClass = await enrollmentModel.find({
		class_id: Number(classId)
	}).select('student_id').exec();
	const studentIds = studentsInClass.map(enrollment => enrollment.student_id);

	const reviews = await questionModel.aggregate([
		{
			$lookup: {
				from: 'ratings',
				localField: 'id',
				foreignField: 'question_id',
				as: 'answers',
				pipeline: [
					{
						$match: {
							teacher_id: Number(teacherId),
							student_id: { $in: studentIds }
						}
					},
					{
						$group: {
							_id: "$grade",
							count: {
								$count: {}
							},
						}
					},
					{
						$project: {
							grade: '$_id',
							count: true
						}
					}
				]
			}
		}
	]);

	const totalStudents = studentIds.length;
	const result = reviews.map(q => ({
		...q, rated: q.answers.length, unrated: totalStudents - q.answers.length
	}));

	res.json(result);
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

router.put('/enrollments/', async (req: Request, res: Response) => {
	const { student_id, class_id } = req.body;

	const enrollment = await enrollmentModel.updateOne({
		student_id,
	}, {
		class_id
	}, {
		upsert: true
	});

	res.json(enrollment);
});

export default router;