import { configureStore } from '@reduxjs/toolkit'

import devices from './reducers/devices';
import username from './reducers/username';

const reducer = {
	username,
	devices,
};

const preloadedState = {
	username: '',
	devices: [],
};

export const store = configureStore({
	reducer,
	devTools: process.env.NODE_ENV !== 'production',
	preloadedState,
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
