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
    } catch(error: any) {
        if (error.code === 11000) {
            next(new HttpError(400, 'Duplicated username.'))
        }
        logger.error('Error during adding user account: ', error);
        next(new HttpError());
    }
};

export const login = wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const credentials = req.body

    const user: IUser | null = await userService.getUserByName(credentials.username);

    if (!user) {
        logger.error('Error during login, finding user');
        next(new HttpError(400, 'Invalid credentials.'));
    }

    if (!(await user!.validatePassword(credentials.password))) {
        logger.error('Error during login, validating password');
        next(new HttpError(400, 'Invalid credentials.'));
    }

    const token = sign(
        { 
            userId: user!.id,
            username: user!.username 
        },
        process.env.JWT_SECRET as string,
        { expiresIn: '2h' }
    );

    sendResponse(res, token);
});


export const logout = async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId

    const user: IUser | null = await userService.getUserById(userId);

    if (!user) {
        logger.error('Error during lougout, invalid user');
        next(new HttpError(400, 'Invalid user.'));
    }

    sendResponse(res, 'Successfully logged out.')
}

export const changeUsername = wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const newUsername = req.body.username;
    let newUser: IUser | null = null;

    const user: IUser | null = await userService.getUserById(userId);

    if (!user) {
        logger.error('Error during changing username, invalid user', user);
        next(new HttpError(400, 'Invalid user.'));
    }
    
    try {
        newUser = await userService.changeUsername(user!.id, newUsername);
    } catch (error) {
        next(new HttpError());
    }
    
    sendResponse(res, newUser)
});

export const verifyToken = async(req: Request, res: Response, _next: NextFunction) => {
    const user = {
        id: req.userId,
        username: req.username
    }

    sendResponse(res, user);
}

export const revokeAccount = async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    let user: IUser | null = null;

    try {
        user = await userService.deleteUser(userId);
    } catch (error) {
        logger.error('Error during account revoking, invalid user');
        next(new HttpError());
    }

    sendResponse(res, user);
}
