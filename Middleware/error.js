import ErrorHandler from '../Utils/errorHandler.js'

const errorMiddleware = (err, req, res, next) => {
    err.status = err.status || 500;
    err.message = err.message || 'Internal Server Error';

    res.status(err.status).json({
        success: false,
        error: err
    })
} 

export default errorMiddleware;

// const ErrorHandler = require('../Utils/errorHandler')

// module.exports = (err, req, res, next) => {
//     err.status = err.status || 500;
//     err.message = err.message || 'Internal Server Error';

//     res.status(err.status).json({
//         success: false,
//         error: err
//     })
// } 
