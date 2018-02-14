/**
 * @module config/swagger
 * @author Jose de Jesus Alvarez Hernandez
 * @desc App Swagger specifications file
 */

/** Swagger JSDoc instance */
const swaggerJSDoc = require('swagger-jsdoc');
/** URL instance */
const url = require('url');
/** URL host */
const urlHost = url.parse(process.env.API_URL).host;
/** API Port */
const apiPort = process.env.PORT;

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