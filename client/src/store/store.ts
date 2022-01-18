import { configureStore } from '@reduxjs/toolkit'

import devices from './reducers/devices';
import user from './reducers/user';

const reducer = {
	user,
	devices,
};

const preloadedState = {
	user: {
		id: '',
		username: '',
	},
	devices: [],
};

export const store = configureStore({
	reducer,
	devTools: process.env.NODE_ENV !== 'production',
	preloadedState,
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
