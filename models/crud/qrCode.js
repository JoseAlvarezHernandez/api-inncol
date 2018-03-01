/**
 * @module models/crud/APIqrCode
 * @author Jose de Jesus Alvarez Hernandez
 * @desc APIqrCode model CRUD operations
 */

/** API qrCode Model  */
const APIqrCode = require('../qrCode');

const crud = {
    findWhere: findWhere,
    save: save,
    findAll: findAll,
}

function findWhere(fields, conditions) {
    let query = APIqrCode.find(conditions).sort();
    query.select(fields.join(' '));
    return query.exec().then(successCB, errorCB);
}

function save(qrCode) {
    let APIqrCodeResource = new APIqrCode(qrCode);
    return APIqrCodeResource.save().then(successCB, errorCB);
};

function findAll(fields) {
    let query = APIqrCode.find();
    query.select(fields.join(' '));
    return query.exec().then(successCB, errorCB);
};

function successCB(regs) {
    return (regs);
}

function errorCB(reason) {
    return ({ error: reason });
}
module.exports = crud;