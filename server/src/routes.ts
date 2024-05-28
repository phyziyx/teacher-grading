import express, { Request, Response } from 'express';
import { studentModel, questionModel, classModel, teacherModel, ratingModel, enrollmentModel } from './models';

const router = express.Router();

router.get('/students/', async (req: Request, res: Response) => {
	const students = await studentModel.find();
	res.send(students);
});

router.get('/students/:studentId', async (req: Request, res: Response) => {
	const studentId = req.params.studentId;

	const student = await enrollmentModel.aggregate([
		{
			$match: { student_id: Number(studentId) }
		},
		{
			$lookup: {
				from: "assigned",
				localField: "class_id",
				foreignField: "class_id",
				as: "assignedClasses"
			},
		},
		{
			$lookup: {
				from: "teachers",
				localField: "assignedClasses.teacher_id",
				foreignField: "id",
				as: "teacherDetails"
			},
		},
		{
			$unwind: "$teacherDetails"
		},
		{
			$unwind: "$assignedClasses"
		}
	]);

	res.send(student);
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