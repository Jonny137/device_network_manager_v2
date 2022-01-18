import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// TODO: move to separate file
export interface Device {
	_id: string;
	name: string;
	type: string;
	host: string;
	status: string;
	disc_time: number;
	editing?: boolean;
}

const initialState: Device[] = [];

export const deviceSlice = createSlice({
	name: 'devices',
	initialState,
	reducers: {
		setDevices: (state: Device[], action: PayloadAction<Device[]>) => {
			return action.payload;
		},
		addDevice: (state: Device[], action: PayloadAction<Device>) => {
			return state.concat([ action.payload ]);
		},
		addDevices: (state: Device[], action: PayloadAction<Device[]>) => {
			return state.concat(action.payload);
		},
		editDevice: (state: Device[], action: PayloadAction<Device>) => {
			return state.map(device => device._id === action.payload._id ? action.payload : device);
		},
		removeDevice: (state: Device[], action: PayloadAction<Device>) => {
			return state.filter(device => device._id !== action.payload._id);
		},
	},
});

export const { setDevices, addDevice, addDevices, editDevice, removeDevice } = deviceSlice.actions;

export const selectDevices = (state: RootState) => state.devices;

export default deviceSlice.reducer;
