/**
 * @module server
 * @author Jose de Jesus Alvarez Hernandez
 * @desc Node JS server.js
 */
const restify = require('restify');
const restifyRouter = require('restify-routing');
const pathTree = require('./routes/pathTree');
const bunyan = require('bunyan');
const logger = require('./models/crud/log');
/** Restify Server */
const server = restify.createServer();
/** Set cors  */
//server.use(require('./configs/crossOrigins'));
restify.CORS.ALLOW_HEADERS.push('Accept-Encoding');
restify.CORS.ALLOW_HEADERS.push('Accept-Language');

server.use(restify.CORS())
/** set parsers */
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser({ mapParams: true }));
server.use(restify.plugins.bodyParser({ mapParams: true }));
/** Restify Router */
let router = restifyRouter.climbPathTree(pathTree);
router.applyRoutes(server);
server.get(/\/api-docs\/?.*/, restify.plugins.serveStatic({ directory: __dirname, default: 'index.html' }));
/** Node app listening port */
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log('Server started');
});
/** Logger */
let logBuffer = new bunyan.RingBuffer({
    limit: 1000
});
server.on('after', restify.plugins.auditLogger({
    log: bunyan.createLogger({
        name: 'audit',
        stream: process.stdout
    }),
    event: 'after',
    server: server,
    logMetrics: logBuffer,
    printLog: false
}));

server.on('after', restify.plugins.metrics(server, function (err, metrics, req, res, route) {
    logger.save(
        {
            logFile: {
                metrics: metrics,
                request: { body: req._body, headers: req.headers },
                response: res._body,
                route: route
            },
            error: typeof err === 'undefined' ? false : err
        }
    );
}));

