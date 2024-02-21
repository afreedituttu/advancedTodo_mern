const CustomError = require('../utilities/CustomError')

const errorHandler = (err, req, res, next) => {
    console.log(err);

    return res.status(err.statusCode || 500)({
        success:false,
        message:err.message || 'internal server error'
    })
}

module.exports = errorHandler;