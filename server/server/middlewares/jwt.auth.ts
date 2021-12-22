import { verify } from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';

import logger from '../services/logger';
import HttpError from '../services/errors/http.error';

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
        logger.error('User authentication failed, no token provided.');
        next(new HttpError(403, 'Authentication failed.'));
    }
    try {
        const token = authorization?.split(' ')[1];
        const data = verify((<any>token), process.env.JWT_SECRET as string);

        req.userId = data.userId;
        req.username = data.username;

        return next();
    } catch (error) {
        logger.error('User authentication failed, token invalid.');
        next(new HttpError(403, 'Invalid token.'));
    }
};
