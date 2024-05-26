/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'project';

const questions = 'questions';
const students = 'students';
const teachers = 'teachers';
const classes = 'classes';

// Create a new database.
use(database);

// Create a new collection.
db.createCollection(questions);
db.createCollection(students);
db.createCollection(teachers);
db.createCollection(classes);

db.getCollection(classes).insertMany([
	{
		"id": 1,
		"teacher_id": 1,
		"students": [1, 2, 3]
	},
	{
		"id": 2,
		"teacher_id": 2,
		"students": [2, 3, 4]
	},
	{
		"id": 3,
		"teacher_id": 3,
		"students": [3, 4, 5]
	},
	{
		"id": 4,
		"teacher_id": 4,
		"students": [4, 5, 1]
	},
	{
		"id": 5,
		"teacher_id": 5,
		"students": [5, 1, 2]
	}
]);

db.getCollection(teachers).insertMany([
	{
		"id": 1,
		"first_name": "John",
		"last_name": "Doe",
		"subject": "Mathematics"
	},
	{
		"id": 2,
		"first_name": "Jane",
		"last_name": "Smith",
		"subject": "English"
	},
	{
		"id": 3,
		"first_name": "Robert",
		"last_name": "Brown",
		"subject": "History"
	},
	{
		"id": 4,
		"first_name": "Emily",
		"last_name": "Davis",
		"subject": "Biology"
	},
	{
		"id": 5,
		"first_name": "Michael",
		"last_name": "Wilson",
		"subject": "Chemistry"
	}
]);

db.getCollection(students).insertMany([
	{
		"student_id": 1,
		"first_name": "Alice",
		"last_name": "Smith"
	},
	{
		"student_id": 2,
		"first_name": "Bob",
		"last_name": "Johnson"
	},
	{
		"student_id": 3,
		"first_name": "Charlie",
		"last_name": "Brown"
	},
	{
		"student_id": 4,
		"first_name": "David",
		"last_name": "Williams"
	},
	{
		"student_id": 5,
		"first_name": "Eva",
		"last_name": "Davis"
	}
]);

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

// The prototype form to create a collection:
/* db.createCollection( <name>,
  {
	capped: <boolean>,
	autoIndexId: <boolean>,
	size: <number>,
	max: <number>,
	storageEngine: <document>,
	validator: <document>,
	validationLevel: <string>,
	validationAction: <string>,
	indexOptionDefaults: <document>,
	viewOn: <string>,
	pipeline: <pipeline>,
	collation: <document>,
	writeConcern: <document>,
	timeseries: { // Added in MongoDB 5.0
	  timeField: <string>, // required for time series collections
	  metaField: <string>,
	  granularity: <string>,
	  bucketMaxSpanSeconds: <number>, // Added in MongoDB 6.3
	  bucketRoundingSeconds: <number>, // Added in MongoDB 6.3
	},
	expireAfterSeconds: <number>,
	clusteredIndex: <document>, // Added in MongoDB 5.3
  }
)*/

// More information on the `createCollection` command can be found at:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/
