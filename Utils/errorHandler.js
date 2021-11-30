//Error Handlerr Class
class ErrorHandler extends Error {
    constructor(msg, status) {
        super(msg);
        this.status = status
        Error.captureStackTrace(this, this.constructor)
    }
}

export default ErrorHandler;