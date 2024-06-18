import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { IClass, IQuestion, IStudentEnrollment, ITeacher, ITeacherReview } from "../../types";

interface AdminSlice {
	loading: boolean;
	error: string;
	activeTeacher: ITeacher | undefined;
	activeClass: IClass | undefined;
	teachers: ITeacher[];
	classes: IClass[];
	questions: IQuestion[];
	reviews: ITeacherReview[];
	students: IStudentEnrollment[];
}

const initialState: AdminSlice = {
	loading: false,
	error: "",
	activeTeacher: undefined,
	activeClass: undefined,
	teachers: [],
	questions: [],
	classes: [],
	reviews: [],
	students: []
};

/**
 * Fetches the list of students that exist
 */
export const getStudentList = createAsyncThunk("admin/enrollments", async () => {
	const response = await api.get(`/enrollments`);
	return response.data as IStudentEnrollment[];
});

/**
 * Fetches the set of the questions that the students get to assess their teacher on
 */
export const getQuestions = createAsyncThunk("admin/questions", async () => {
	const response = await api.get(`/questions`);
	return response.data as IQuestion[];
});

/**
 * Fetches the list of all teachers that exist
 */
export const getTeachers = createAsyncThunk("admin/teachers", async () => {
	const response = await api.get(`/teachers`);
	return response.data as ITeacher[];
});

/**
 * Fetches the list of all classes that the teacher is offered in or teachers
 */
export const getTeacherClasses = createAsyncThunk("admin/classes", async (teacherId?: number) => {
	const response = await api.get(`/classes/${teacherId ? teacherId : ""}`);
	return response.data as IClass[];
});

/**
 * Fetches the list of questions and ratings according to the specified teacher and class IDs
 */
interface IData {
	classId: number;
	teacherId: number;
}

export const getTeacherReviewsByClass = createAsyncThunk("admin/reviews", async ({ classId, teacherId }: IData) => {
	const response = await api.get(`/reviews`, {
		params: {
			classId: Number(classId),
			teacherId: Number(teacherId)
		}
	});

	return response.data as ITeacherReview[];
});

export const adminSlide = createSlice({
	name: "admin",
	initialState,
	reducers: {
		setActiveTeacher: (state, action: PayloadAction<ITeacher | undefined>) => {
			state.activeTeacher = action.payload;
		},
		setActiveClass: (state, action: PayloadAction<IClass | undefined>) => {
			state.activeClass = action.payload;
		},
		resetActiveClass: (state) => {
			state.activeClass = undefined;
		},
		assignStudentClass: (state, action: PayloadAction<{ studentId: number; classData: IClass }>) => {
			state.students = state.students.map((student) => {
				if (student.student_id === action.payload.studentId) {
					return {
						...student, enrollment: action.payload.classData
					};
				}
				return student;
			});
		},
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
			//
			.addCase(getTeacherClasses.pending, (state) => {
				state.loading = true;
			})
			.addCase(getTeacherClasses.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.classes = payload;
			})
			.addCase(getTeacherClasses.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload as string;
			})
			//
			.addCase(getTeacherReviewsByClass.pending, (state) => {
				state.loading = true;
			})
			.addCase(getTeacherReviewsByClass.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.reviews = payload;
			})
			.addCase(getTeacherReviewsByClass.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload as string;
			})
			//
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
	},
});

export const { setActiveTeacher, setActiveClass, resetActiveClass, assignStudentClass } = adminSlide.actions;
export const adminReducer = adminSlide.reducer;