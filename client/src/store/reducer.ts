import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface Device {
    id: string;
    name: string;
    type: string;
    host: string;
}

const initialState: Device[] = [];

export const deviceSlice = createSlice({
    name: 'devices',
    initialState,
    reducers: {
        add: (state: Device[], action: PayloadAction<Device>) => {
            return state.concat(action.payload);
        },
        edit: (state: Device[], action: PayloadAction<Device>) => {
            return state.map(device => device.id === action.payload.id ? action.payload : device);
        },
        remove: (state: Device[], action: PayloadAction<Device>) => {
            return state.filter(device => device.id === action.payload.id);
        },
    },
});

export const { add, edit, remove } = deviceSlice.actions;

export const selectCount = (state: RootState) => state.devices;

export default deviceSlice.reducer;
