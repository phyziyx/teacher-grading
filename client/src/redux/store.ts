import { configureStore } from '@reduxjs/toolkit'
import { gradingReducer } from './slices';

export const store = configureStore({
	reducer: {
		grading: gradingReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;