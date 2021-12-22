import { sign } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { IUser } from './user.model';
import userService from './user.service';
import logger from '../../services/logger';
import { sendResponse, wrapAsync } from '../../services/utils';
import HttpError from '../../services/errors/http.error';

export const createAccount = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser: IUser | null = await userService.addUserAccount(req.body);
        sendResponse(res, newUser);
    } catch(error) {
        logger.error('Error during adding user account: ', error);
        next(new HttpError());
    }
};

export const login = wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const credentials = req.body

    const user: IUser | null = await userService.getUserByName(credentials.username);

    if (!user) {
        logger.error('Error during login, finding user');
        throw new HttpError(400, 'Invalid credentials.');
    }

    if (!(await user.validatePassword(credentials.password))) {
        logger.error('Error during login, validating password');
        throw new HttpError(400, 'Invalid credentials.');
    }

    const token = sign(
        { 
            userId: user.id,
            username: user.username 
        },
        process.env.JWT_SECRET as string,
        { expiresIn: '2h' }
    );

    return res
        .status(200)
        .json({ message: token, status: 'OK' });
});


export const logout = async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId

    const user: IUser | null = await userService.getUserById(userId);

    if (!user) {
        logger.error('Error during lougout, invalid user');
        throw new HttpError(400, 'Invalid user.');
    }

    return res
        .status(200)
        .json({ message: 'Successfully logged out', status: 'OK' });
}

export const changeUsername = wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const newUsername = req.body.username;
    let newUser: IUser | null;

    const user: IUser | null = await userService.getUserById(userId);

    if (!user) {
        logger.error('Error during changing username, invalid user', user);
        throw new HttpError(400, 'Invalid user.');
    }
    
    try {
        newUser = await userService.changeUsername(user.id, newUsername);
    } catch (error) {
        throw new HttpError();
    }
    

    sendResponse(res, newUser)
});

export const verifyToken = async(req: Request, res: Response, next: NextFunction) => {
    const user = {
        id: req.userId,
        username: req.username
    }

    sendResponse(res, user);
}

export const revokeAccount = async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    let user: IUser | null;

    try {
        user = await userService.deleteUser(userId);
    } catch (error) {
        logger.error('Error during account revoking, invalid user');
        throw new HttpError();
    }

    sendResponse(res, user);
}
