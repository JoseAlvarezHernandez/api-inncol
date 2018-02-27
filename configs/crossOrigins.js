const crossOrigins = (request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, source, Authorization, app');
    response.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    return next();
}
module.exports = crossOrigins;
