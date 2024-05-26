import mongoose, { Schema } from 'mongoose';

const questionSchema = new Schema({
	id: Number,
	question: String,
	choices: [String]
});
export const questionModel = mongoose.model('Questions', questionSchema);

const studentSchema = new Schema({
	student_id: Number,
	first_name: String,
	last_name: String
});
export const studentModel = mongoose.model('Students', studentSchema);

const teacherSchema = new Schema({
	id: Number,
	first_name: String,
	last_name: String,
	subject: String,
});
export const teacherModel = mongoose.model('Teachers', teacherSchema);

const ratingSchema = new Schema({
	student_id: Number,
	teacher_id: Number,
	question_id: Number,
	grade: Number
});
export const ratingModel = mongoose.model('Ratings', ratingSchema);

const classSchema = new Schema({
	id: Number,
	teacher_id: Number,
	students: [Number]
});
export const classModel = mongoose.model('Classes', classSchema);