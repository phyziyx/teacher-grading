import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { IQuestion, IStudent, ITeacher } from "../../types";

interface SemesterState {
	loading: boolean;
	error: string;
	students: IStudent[];
	activeStudent: IStudent | undefined;
	questions: IQuestion[];
	teachers: ITeacher[];
}

const initialState: SemesterState = {
	loading: false,
	error: "",
	students: [],
	activeStudent: undefined,
	questions: [],
	teachers: []
};

export const getStudents = createAsyncThunk("grading/students", async () => {
	const response = await api.get(`/students`);
	return response.data as IStudent[];
});

export const getQuestions = createAsyncThunk("grading/questions", async () => {
	const response = await api.get(`/questions`);
	return response.data as IQuestion[];
});

export const getTeachers = createAsyncThunk("grading/teachers", async () => {
	const response = await api.get(`/teachers`);
	console.log(response.data);
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
				state.questions = payload;
			})
			.addCase(getTeachers.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload as string;
			})
	},
});

export const { setActiveStudent } = gradingSlice.actions;
export const gradingReducer = gradingSlice.reducer;