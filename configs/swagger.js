/**
 * @module config/swagger
 * @author Jose de Jesus Alvarez Hernandez
 * @desc App Swagger specifications file
 */

/** Swagger JSDoc instance */
const swaggerJSDoc = require('swagger-jsdoc');
/** URL host */
const urlHost = 'http://inncol-api-inncol-api.7e14.starter-us-west-2.openshiftapps.com';
/** API Port */
const apiPort = process.env.port;

const swaggerDefinition = {
    info: {
        title: 'API',
        version: '1.0.0',
        description: 'API Documentation',
    },
    host: (urlHost == 'localhost') ? (urlHost + ':' + apiPort) : urlHost,
    basePath: '/',
    // Order of tags in UI
    tags: [],
};

/** Swagger options object */
const options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./controllers/*.js'],
};
const specification = swaggerJSDoc(options);

/** Swagger specification */
module.exports = specification;

