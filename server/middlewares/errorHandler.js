const errorHandler = (err, req, res, next) => {
    console.log(err);
    if(err.code == 11000){
        err.message = "Already exist"
    }
    switch(err.name){
        case "SyntaxError":
            err.message = "Unexpected syntax"
        case "CastError":
            err.message = "Please provide a valid id"
        case "TokenExpiredError":
            err.message = "Session expired"
        case "JsonWebTokenError":
            err.message = "Login to continue"
    }

    return res.status(err.statusCode || 500).json({
        success:false,
        message:err.message || 'Internal server error'
    })
}

module.exports = errorHandler;