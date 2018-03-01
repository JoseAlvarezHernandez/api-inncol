/**
 * @module models/qrCode
 * @author Jose de Jesus Alvarez Hernandez
 * @desc API qrCode model
 */

/** Mongoose connections */
const connections = require('../connections');
/** Mongoose dependency */
const mongoose = require('mongoose');
/** Mongoose schema object */
let Schema = mongoose.Schema;

const qrCode = {
    qrCodeId: { type: String, unique: true },
    initDate: Date,
    endDate: Date,
    shortenURl: String,
    createdBy: String,
    description: String,
    name: String,
};

/** Additional configurations */
const configs = {
    timestamps: {
        createdAt: 'created_at'
    },
};

/** qrCode schema object*/
var qrCodechema = new Schema(qrCode, configs);

/** qrCode model instance */
module.exports = connections.usersConnectionChain.model('QRCode', qrCodechema, 'qrCode');