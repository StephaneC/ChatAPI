import { TchatError } from "./Error";

export const logError = (err, req, res, next) => {
    console.error("log error handler", err);
    next(err);
}
export const  errorHandler = (err, req, res, next) => {
    console.log('error Handler');
    if (err instanceof TchatError) {
        res.status(err.code).json(err);
    } else {
        res.status(500).json({ message: 'Unexpected error happened on the server' });
    }
}