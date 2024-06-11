import express, { Request, Response } from 'express';
import { studentModel, questionModel, classModel, teacherModel, ratingModel, enrollmentModel, assignedModel } from './models';

const router = express.Router();

router.get('/students/', async (req: Request, res: Response) => {
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

	// const classes = await assignedModel.aggregate([
	// 	{
	// 		$match: {
	// 			teacher_id: teacherId
	// 		}
	// 	},
	// 	{
	// 		$lookup: {
	// 			from: 'classes',
	// 			localField: 'class_id',
	// 			foreignField: 'id',
	// 			as: 'offered'
	// 		}
	// 	},
	// 	{
	// 		$unwind: '$offered'
	// 	},
	// 	{
	// 		$project: {
	// 			class_id: true,
	// 			offered: {
	// 				id: true,
	// 				semester: true,
	// 				section: true
	// 			}
	// 		}
	// 	}
	// ]);

	console.log(JSON.stringify(classes, undefined, 2));
	res.send(classes);
});

router.get('/questions/', async (req: Request, res: Response) => {
	const questions = await questionModel.find();
	res.json(questions);
});

router.get('/reviews/', async (req: Request, res: Response) => {
	const { classId, teacherId } = req.query;

	if (!classId || !teacherId) {
		return res.status(400).json({
			message: 'missing teacherId or classId or both.'
		});
	}

	// This is perfect, but we need to get only for students of that class
	const questions = await questionModel.aggregate([
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
						}
					},
					// {
					// 	$lookup: {
					// 		from: 'assigneds',
					// 		localField: 'class_id',
					// 		foreignField: 'class_id',
					// 		as: 'assigneds'
					// 	}
					// },
					{
						$group: {
							_id: "$grade",
							count: {
								$count: {}
							},
						}
					},
				]
			},
		},
	]);
	res.json(questions);
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