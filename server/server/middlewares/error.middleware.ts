import { NextFunction, Request, Response } from 'express';
import HttpError from '../services/errors/http.error';
 
const errorMiddleware = (
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const status = err.status;
    const message = err.message;

    res.status(status).send({
        status,
        message,
    });
}
 
export default errorMiddleware;
