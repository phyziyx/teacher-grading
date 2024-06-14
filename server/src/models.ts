import mongoose, { Schema } from 'mongoose';

const questionSchema = new Schema({
	id: Number,
	question: String,
	choices: [String]
});
export const questionModel = mongoose.model('Questions', questionSchema);

const studentSchema = new Schema({
	student_id: Number,
	name: String,
	regno: String
});
export const studentModel = mongoose.model('Students', studentSchema);

const teacherSchema = new Schema({
	id: Number,
	name: String,
});
export const teacherModel = mongoose.model('Teachers', teacherSchema);

const classSchema = new Schema({
	id: Number,
	semester: Number,
	section: String
});
export const classModel = mongoose.model('Classes', classSchema);

const assignedSchema = new Schema({
	teacher_id: Number,
	class_id: Number
});
export const assignedModel = mongoose.model('Assigneds', assignedSchema);

const enrollmentSchema = new Schema({
	student_id: Number,
	class_id: Number
});
export const enrollmentModel = mongoose.model('Enrollments', enrollmentSchema);

const ratingSchema = new Schema({
	student_id: Number,
	teacher_id: Number,
	question_id: Number,
	grade: String
});
export const ratingModel = mongoose.model('Ratings', ratingSchema);