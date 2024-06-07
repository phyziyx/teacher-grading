import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { IQuestion, ITeacher } from "../../types";

interface AdminSlice {
	loading: boolean;
	error: string;
	activeTeacher: ITeacher | undefined;
	teachers: ITeacher[];
	questions: IQuestion[];
}

const initialState: AdminSlice = {
	loading: false,
	error: "",
	activeTeacher: undefined,
	teachers: [],
	questions: []
};

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

export const adminSlide = createSlice({
	name: "admin",
	initialState,
	reducers: {
		setActiveTeacher: (state, action: PayloadAction<ITeacher | undefined>) => {
			state.activeTeacher = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder
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

export const { setActiveTeacher } = adminSlide.actions;
export const adminReducer = adminSlide.reducer;