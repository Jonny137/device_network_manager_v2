import mongoose, { Schema, Document } from 'mongoose';

export interface IDevice extends Document {
    name: string;
    type: string;
    host: string;
    status: string;
    disc_time: number;
}

const Device: Schema = new Schema({
    name: String,
    type: String,
    host: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Disconnected'
    },
    disc_time: {
        type: Number,
        default: 0
    },
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
}, {timestamps: true});

export default mongoose.model<IDevice>('devices', Device);
