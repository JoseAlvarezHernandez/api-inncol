/**
 * @module models/logs
 * @author Jose de Jesus Alvarez Hernandez
 * @desc API logs model
 */

/** Mongoose connections */
const connections = require('../connections');
/** Mongoose dependency */
const mongoose = require('mongoose');
/** Mongoose schema object */
let Schema = mongoose.Schema;

const log = {
    logFile: Object,
    error: Boolean,
};

/** Additional configurations */
const configs = {
    timestamps: {
        createdAt: 'created_at',
    },
};

/** Log schema object*/
const logSchema = new Schema(log, configs);

/** Log model instance */
module.exports = connections.usersConnectionChain.model('log', logSchema, 'logger');