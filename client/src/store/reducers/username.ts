import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

const initialState = '';

export const usernameSlice = createSlice({
	name: 'username',
	initialState,
	reducers: {
		setUsername: (state: string, action: PayloadAction<string>) => action.payload,
		removeUsername: () => '',
	},
});

export const { setUsername, removeUsername } = usernameSlice.actions;

export const selectUsername = (state: RootState) => state.username;

export default usernameSlice.reducer;
