/**
 * @module server
 * @author Jose de Jesus Alvarez Hernandez
 * @desc Node JS server.js
 */

const app = require('./config/server');
const express = require('express');
const path = require('path');
const port = process.env.port || 1339;

const initRoute = require('./routes/init');
/**
 * @desc Publishing public/ folder 
 */
app.use(express.static(path.join(__dirname, 'public')));

/** 
 * App listening port 
 */
app.listen(port);

/** 
 * App listening port 
 */
app.use(initRoute);
