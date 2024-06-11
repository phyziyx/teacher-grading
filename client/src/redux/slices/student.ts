import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { IQuestion, IStudent, ITeacherRating } from "../../types";

interface StudentSlice {
	loading: boolean;
	error: string;
	students: IStudent[];
	activeStudent: IStudent | undefined;
	ratings: ITeacherRating[];
	questions: IQuestion[];
}

const initialState: StudentSlice = {
	loading: false,
	error: "",
	students: [],
	activeStudent: undefined,
	ratings: [],
	questions: []
};

/**
 * Fetches the list of students that exist
 */
export const getStudentList = createAsyncThunk("grading/students", async () => {
	const response = await api.get(`/students`);
	return response.data as IStudent[];
});

/**
 * Fetches the teacher and its reviews for the respective student
 */
export const getTeacherReview = createAsyncThunk("grading/review", async (id: number) => {
	const response = await api.get(`/students/${id}`);
	return response.data as ITeacherRating[];
});

/**
 * Fetches the set of the questions that the students get to assess their teacher on
 */
export const getQuestions = createAsyncThunk("grading/questions", async () => {
	const response = await api.get(`/questions`);
	return response.data as IQuestion[];
});

// /**
//  * Fetches the list of all teachers that exist
//  */
// export const getTeachers = createAsyncThunk("grading/teachers", async () => {
// 	const response = await api.get(`/teachers`);
// 	return response.data as ITeacher[];
// });

export const studentSlice = createSlice({
	name: "student",
	initialState,
	reducers: {
		setActiveStudent: (state, action: PayloadAction<IStudent | undefined>) => {
			state.activeStudent = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getStudentList.pending, (state) => {
				state.loading = true;
			})
			.addCase(getStudentList.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.students = payload;
			})
			.addCase(getStudentList.rejected, (state, { payload }) => {
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
			.addCase(getTeacherReview.pending, (state) => {
				state.loading = true;
			})
			.addCase(getTeacherReview.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.ratings = payload;
			})
			.addCase(getTeacherReview.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload as string;
			})
	},
});

export const { setActiveStudent } = studentSlice.actions;
export const studentReducer = studentSlice.reducer;