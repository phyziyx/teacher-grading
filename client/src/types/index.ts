import { RouteObject } from "react-router-dom";

export type MyRouteObject = { name: string } & RouteObject;

export interface IQuestion {
	id: number;
	question: string;
	choices: string[];
}

export interface IStudent {
	student_id: number;
	first_name: string;
	last_name: string;
}

export interface ITeacher {
	id: number;
	first_name: string;
	last_name: string;
	subject: string;
	grade?: number;
}

export interface IRating {
	teacher_id: number;
	question_id: number;
	grade: number;
}