/**
 * @module config/expressServer
 * @author Jose de Jesus Alvarez Hernandez
 * @desc App Express Server Configurations file
 */

/** Express instance */
const express = require('express');
/** Express object */
const app = express();
/** bodyParser instance */
const bodyParser = require('body-parser');
/** Path instance */
const path = require('path');

/** 
 * App Access Control configurations 
 */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //valid domains list
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, source, Authorization');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

/** 
 * App Body Parser Configs 
 */
app.use(bodyParser.urlencoded({
    extended: true,
    limit: 1024 * 1024,
    type: 'application/x-www-form-urlencoding',
}));

app.use(bodyParser.json({
    limit: 1024 * 1024,
    type: 'application/json',
}));


module.exports = app;