import bcrypt from 'bcrypt';
import mongoose, { Schema, Document, HookNextFunction } from 'mongoose';

const SALT: number = parseInt(process.env.SALT || '10', 10);

export interface IUser extends Document {
    username: string;
    password: string;
    validatePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

UserSchema.pre('save', async function (next: HookNextFunction) {
    const self = this as IUser;

    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(SALT);
        self.password = await bcrypt.hash(self.password, salt);
        return next();
    } catch (err) {
        return next();
    }
});

UserSchema.methods.validatePassword = async function (pass: string) {
    return await bcrypt.compare(pass, this.password);
};

export default mongoose.model<IUser>('users', UserSchema);
