/**
 * @module connections
 * @author Jose de Jesus Alvarez Hernandez
 * @desc Mongoose connections module
 */

/** Mongoose dependency */
const mongoose = require('mongoose');
/** Environment configurations */
const dbConnections = require('./configs/dbConnections');

/** MongoDB Users connection chain  */
const usersConnectionChain = dbConnections.users;

/** Mongoose promises configuration  */
mongoose.Promise = global.Promise;

module.exports = {
    usersConnectionChain: mongoose.createConnection(usersConnectionChain)
};