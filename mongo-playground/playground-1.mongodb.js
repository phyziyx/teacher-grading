/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'project';

// Create a new database.
use(database);

const questions = 'questions';
db.getCollection(questions).insertMany([
	{
		"id": 1,
		"question": "How clearly does the teacher explain the course material?",
		"choices": ["Poor", "Fair", "Good", "Excellent"]
	},
	{
		"id": 2,
		"question": "How approachable and available is the teacher for additional help or questions?",
		"choices": ["Poor", "Fair", "Good", "Excellent"]
	},
	{
		"id": 3,
		"question": "How well does the teacher manage the classroom and maintain a conducive learning environment?",
		"choices": ["Poor", "Fair", "Good", "Excellent"]
	},
	{
		"id": 4,
		"question": "How effectively does the teacher use different teaching methods and resources to enhance learning?",
		"choices": ["Poor", "Fair", "Good", "Excellent"]
	},
	{
		"id": 5,
		"question": "How fair and consistent is the teacher in grading and providing feedback on assignments?",
		"choices": ["Poor", "Fair", "Good", "Excellent"]
	}
]);

const students = 'students';
db.getCollection(students).insertMany([
	{
		"student_id": 1,
		"name": "Alice Smith",
		"regno": "240001"
	},
	{
		"student_id": 2,
		"name": "Bob Johnson",
		"regno": "240002"
	},
	{
		"student_id": 3,
		"name": "Charlie Brown",
		"regno": "240003"
	},
	{
		"student_id": 4,
		"name": "David Williams",
		"regno": "240004"
	},
	{
		"student_id": 5,
		"name": "Eva Davis",
		"regno": "240005"
	}
]);

const teachers = 'teachers';
db.getCollection(teachers).insertMany([
	{
		"id": 1,
		"name": "John Doe",
	},
	{
		"id": 2,
		"name": "Jane Smith",
	},
	{
		"id": 3,
		"name": "Robert Brown",
	},
	{
		"id": 4,
		"name": "Emily Davis",
	},
	{
		"id": 5,
		"name": "Michael Wilson",
	}
]);

const classes = 'classes';
db.getCollection(classes).insertMany([
	{
		"id": 1,
		"semester": 1,
		"section": "A"
	},
	{
		"id": 2,
		"semester": 1,
		"section": "B"
	},
	{
		"id": 3,
		"semester": 2,
		"section": "A"
	},
	{
		"id": 4,
		"semester": 2,
		"section": "B"
	},
	{
		"id": 5,
		"semester": 3,
		"section": "A"
	},
	{
		"id": 6,
		"semester": 3,
		"section": "B"
	}
]);

const assigned = 'assigned';
db.getCollection(assigned).insertMany([
	{
		"class_id": 1,
		"teacher_id": 1,
	},
	{
		"class_id": 1,
		"teacher_id": 2,
	},
	{
		"class_id": 2,
		"teacher_id": 2,
	},
	{
		"class_id": 2,
		"teacher_id": 3,
	},
	{
		"class_id": 3,
		"teacher_id": 3,
	},
	{
		"class_id": 3,
		"teacher_id": 4,
	},
	{
		"class_id": 4,
		"teacher_id": 4,
	},
	{
		"class_id": 4,
		"teacher_id": 5,
	},
	{
		"class_id": 5,
		"teacher_id": 5,
	},
	{
		"class_id": 5,
		"teacher_id": 1,
	}
]);

const enrolled = 'enrolled';
db.getCollection(enrolled).insertMany([
	{
		"student_id": 1,
		"class_id": 1
	},
	{
		"student_id": 1,
		"class_id": 2
	},
	{
		"student_id": 2,
		"class_id": 2
	},
	{
		"student_id": 2,
		"class_id": 3
	},
	{
		"student_id": 3,
		"class_id": 3
	},
	{
		"student_id": 3,
		"class_id": 4
	},
	{
		"student_id": 4,
		"class_id": 4
	},
	{
		"student_id": 4,
		"class_id": 5
	},
	{
		"student_id": 5,
		"class_id": 5
	},
	{
		"student_id": 5,
		"class_id": 1
	}
]);

const ratings = 'ratings';
db.getCollection(ratings).insertOne([
	{
		"student_id": 1,
		"teacher_id": 1,
		"question_id": 1,
		"grade": "Good"
	}
]);
db.getCollection(ratings).deleteMany({});