const errorHandler = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(err => {
            res.status(400).json({
                message: err.message,
            });
            console.log("Global error handler : " + err);
        });
    };
};

module.exports = errorHandler;
