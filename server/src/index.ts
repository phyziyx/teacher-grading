import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes';
import dotenv from 'dotenv';

const app = express();
const port = 3000;

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/project').then(() => {
	app.listen(port, () => {
		console.log(`Server running at http://localhost:${port}/`);
	});
}).catch((error) => {
	console.error(error);
});

export default app;