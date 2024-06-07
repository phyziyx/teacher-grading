import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { IQuestion, IStudent, ITeacher } from "../../types";

interface GradingSlice {
	loading: boolean;
	error: string;
	students: IStudent[];
	activeStudent: IStudent | undefined;
	questions: IQuestion[];
	teachers: ITeacher[];
}

const initialState: GradingSlice = {
	loading: false,
	error: "",
	students: [],
	activeStudent: undefined,
	questions: [],
	teachers: []
};

/**
 * Fetches the list of students that exist
 */
export const getStudents = createAsyncThunk("grading/students", async () => {
	const response = await api.get(`/students`);
	return response.data as IStudent[];
});

/**
 * Fetches the list of classes and teachers that are related to that student
 */
export const getStudent = createAsyncThunk("grading/student", async (id: number) => {
	const response = await api.get(`/students/${id}`);
	return response.data as IStudent;
});

/**
 * Fetches the set of the questions that the students get to assess their teacher on
 */
export const getQuestions = createAsyncThunk("grading/questions", async () => {
	const response = await api.get(`/questions`);
	return response.data as IQuestion[];
});

/**
 * Fetches the list of all teachers that exist
 */
export const getTeachers = createAsyncThunk("grading/teachers", async () => {
	const response = await api.get(`/teachers`);
	return response.data as ITeacher[];
});

export const gradingSlice = createSlice({
	name: "grading",
	initialState,
	reducers: {
		setActiveStudent: (state, action: PayloadAction<IStudent | undefined>) => {
			state.activeStudent = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getStudents.pending, (state) => {
				state.loading = true;
			})
			.addCase(getStudents.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.students = payload;
			})
			.addCase(getStudents.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload as string;
			})
			//
			.addCase(getQuestions.pending, (state) => {
				state.loading = true;
			})
			.addCase(getQuestions.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.questions = payload;
			})
			.addCase(getQuestions.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload as string;
			})
			//
			.addCase(getTeachers.pending, (state) => {
				state.loading = true;
			})
			.addCase(getTeachers.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.teachers = payload;
			})
			.addCase(getTeachers.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload as string;
			})
	},
});

export const { setActiveStudent } = gradingSlice.actions;
export const gradingReducer = gradingSlice.reducer;