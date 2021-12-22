import { configureStore } from '@reduxjs/toolkit'

import devices from './reducer';

const reducer = {
    devices,
};

const preloadedState = {
    devices: [],
};

export const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
