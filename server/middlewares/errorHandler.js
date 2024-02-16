const CustomError = require('../utilities/CustomError')

const errorHandler = (err, req, res, next) => {
    console.log(err);

    return res.status(err.statusCode || 500).json({
        success:false,
        error:err.message || 'internal server error'
    })
}

module.exports = errorHandler;