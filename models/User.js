/**
 * @module models/intercomUser
 * @author Jose de Jesus Alvarez Hernandez
 * @desc API users model
 */

/** Mongoose connections */
const connections = require('../connections');
/** Mongoose dependency */
const mongoose = require('mongoose');
/** Mongoose schema object */
let Schema = mongoose.Schema;

const User = {
    userId: { type: String, unique: true },
    name: String,
    email: { type: String, unique: true },
    password: String,
    status: Number, // 1 - active, 0 - inactive, 2 - iddle
    createdBy: String,
    updatedBy: String,
    deleted: Boolean,
    homePage: String,
};

/** Additional configurations */
const configs = {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
};

/** User schema object*/
var userSchema = new Schema(User, configs);

/** User model instance */
module.exports = connections.usersConnectionChain.model('User', userSchema, 'users');