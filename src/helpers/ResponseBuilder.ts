import { Response } from "express";

export const sendSuccess = (res: Response, data: any = {}, statusCode = 200) => {
    return res.status(statusCode).json({
        status: {
            status: 'success'
        },
        data: data
    });
}

export const sendError = (res: Response, error: Error, data: any = {}, statusCode = 500) => {
    return res.status(statusCode).json({
        status: {
            status: 'error',
            name: error.name,
            message: error.message 
        },
        data: data
    });
}