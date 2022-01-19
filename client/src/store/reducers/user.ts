import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { User } from '../state.interface';

const initialState: User = {
	id: '',
	username: '',
};

export const usernameSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state: User, action: PayloadAction<User>) => action.payload,
		removeUser: () => ({ ...initialState }),
	},
});

export const { setUser, removeUser } = usernameSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default usernameSlice.reducer;
