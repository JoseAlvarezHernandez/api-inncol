/**
 * @module server
 * @author Jose de Jesus Alvarez Hernandez
 * @desc Node JS server.js
 */
const restify = require('restify');
const restifyRouter = require('restify-routing');
const pathTree = require('./routes/pathTree');
/** Restify Server */
const server = restify.createServer();
/** Restify Router */
let router = restifyRouter.climbPathTree(pathTree);
router.applyRoutes(server);
server.get(/\/api-docs\/?.*/, restify.plugins.serveStatic({ directory: __dirname, default: 'index.html' }));

/** Node app listening port */
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log('Server started');
});

/** Set cors  */
server.use(require('./configs/crossOrigins'));


