import { configureStore } from '@reduxjs/toolkit'
import { studentReducer } from './slices';
import { adminReducer } from './slices/admin';

export const store = configureStore({
	reducer: {
		student: studentReducer,
		admin: adminReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;