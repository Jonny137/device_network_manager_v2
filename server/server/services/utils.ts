import { Request, Response, NextFunction } from 'express';

export const sendResponse = (
    res: Response,
    message: any,
    status: string = 'OK',
    code: number = 200
): Response => {
    return res.status(code).send({
        message,
        status
    });
}

export const wrapAsync = (fn: any): (req: Request, res: Response, next: NextFunction) => void =>
    (req: Request, res: Response, next: NextFunction): void => fn(req, res, next).catch(next);
