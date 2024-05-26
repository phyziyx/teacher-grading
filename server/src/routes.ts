import express, { Request, Response } from 'express';
import { studentModel, questionModel, classModel, teacherModel, ratingModel } from './models';

const router = express.Router();

router.get('/students', async (req: Request, res: Response) => {
	const students = await studentModel.find();
	res.send(students);
});

router.get('/:studentId', (req: Request, res: Response) => {
	const studentId = req.params.studentId;
	res.send(`Hello, student ${studentId}`);
});

router.get('/questions/:studentId', async (req: Request, res: Response) => {
	const questions = await questionModel.find();
	res.json(questions);
});

router.get('/assigned/:studentId', async (req: Request, res: Response) => {
	const studentId = req.params.studentId;

	const classes = await classModel.find({ students: studentId });
	const teacherIds = classes.map(cls => cls.teacher_id);
	const teachers = await teacherModel.find({ id: { $in: teacherIds } });

	res.json(teachers);
});

router.get('/ratings/:studentId', async (req: Request, res: Response) => {
	const studentId = req.params.studentId;
	const ratings = await ratingModel.find({ student_id: studentId });
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