import { RouteObject } from "react-router-dom";

export type MyRouteObject = { name: string; shown?: boolean; } & RouteObject;

export interface IQuestion {
	id: number,
	question: string,
	choices: string[]
}
export interface IStudent {
	student_id: number,
	name: string,
	regno: string
}

export interface ITeacher {
	id: number,
	name: string,
}

export interface IClass {
	id: number,
	semester: number,
	section: string
}

export interface IAssigned {
	teacher_id: number,
	class_id: number
}
export interface IEnrolled {
	student_id: number,
	class_id: number
}

export interface IRating {
	student_id: number,
	teacher_id: number,
	question_id: number,
	grade: number
}

export interface ITeacherRating extends ITeacher {
	ratings: IRating[];
}

export interface ITeacherReview {
	id: number
	question: string
	choices: string[],
	answers: {
		_id: string
		count: number
		grade: string
	}[],
	rated: number
	unrated: number
}

export type ChartDataset = (number | string)[][];