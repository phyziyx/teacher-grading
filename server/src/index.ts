import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

mongoose.connect('mongodb://localhost:27017/project').then(() => {
	app.listen(port, () => {
		console.log(`Server running at http://localhost:${port}/`);
	});
}).catch((error) => {
	console.error(error);
});
