import User, { IUser } from './user.model';

const addUserAccount = async (credentials: object): Promise<IUser> => {
    const newUser = new User(credentials);
    return newUser.save();
}

const getUserByName = async (
    username : string
): Promise<IUser | null> => await User.findOne({ username });

const getUserById = async (
    id : string
): Promise<IUser | null> => await User.findById({ _id: id });

const changeUsername = async (
    id: string,
    username : string
): Promise<IUser | null> => await User.findByIdAndUpdate(
    { _id: id },
    { username },
    {returnOriginal: false}
);

const deleteUser = async (
    id: string
): Promise<IUser | null> => await User.findByIdAndRemove({ _id: id });

export default {
    addUserAccount,
    getUserByName,
    getUserById,
    changeUsername,
    deleteUser
}
