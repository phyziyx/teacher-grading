import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose, { Schema } from 'mongoose';

const questionSchema = new Schema({
	id: Number,
	question: String,
	choices: [String]
});
const questionModel = mongoose.model('Questions', questionSchema);

const studentSchema = new Schema({
	student_id: Number,
	first_name: String,
	last_name: String
});
const studentModel = mongoose.model('Students', studentSchema);

const teacherSchema = new Schema({
	id: Number,
	first_name: String,
	last_name: String,
	subject: String,
});
const teacherModel = mongoose.model('Teachers', teacherSchema);

const ratingSchema = new Schema({
	student_id: Number,
	teacher_id: Number,
	question_id: Number,
	grade: Number
});
const ratingModel = mongoose.model('Ratings', ratingSchema);

const classSchema = new Schema({
	id: Number,
	teacher_id: Number,
	students: [Number]
});
const classModel = mongoose.model('Classes', classSchema);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiRouter = express.Router();

apiRouter.get('/students', async (req: Request, res: Response) => {
	const students = await studentModel.find();
	res.send(students);
});

apiRouter.get('/:studentId', (req: Request, res: Response) => {
	const studentId = req.params.studentId;
	res.send(`Hello, student ${studentId}`);
});

apiRouter.get('/questions/:studentId', async (req: Request, res: Response) => {
	const questions = await questionModel.find();
	res.json(questions);
});

apiRouter.get('/assigned/:studentId', async (req: Request, res: Response) => {
	const studentId = req.params.studentId;

	const classes = await classModel.find({ students: studentId });
	const teacherIds = classes.map(cls => cls.teacher_id);
	const teachers = await teacherModel.find({ id: { $in: teacherIds } });

	res.json(teachers);
});

apiRouter.get('/ratings/:studentId', async (req: Request, res: Response) => {
	const studentId = req.params.studentId;
	const ratings = await ratingModel.find({ student_id: studentId });
	res.json(ratings);
});

apiRouter.put('/rate', async (req: Request, res: Response) => {
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

app.use('/', apiRouter);

mongoose.connect('mongodb://localhost:27017/project');

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
});