/**
 * @module models/crud/APIUser
 * @author Jose de Jesus Alvarez Hernandez
 * @desc APIUser model CRUD operations
 */

/** API User Model  */
const APIUser = require('../User');

const crud = {
    findAll: findAll,
    findWhere: findWhere,
}
function findAll(fields) {
    let query = APIUser.find({ deleted: { $ne: true } });
    query.select(fields.join(' '));
    return query.exec().then(successCB, errorCB);
};

function findWhere(fields, conditions) {
    let query = APIUser.find(conditions).sort({ name: 'desc' });
    query.select(fields.join(' '));
    return query.exec().then(successCB, errorCB);
}

function successCB(regs) {
    return (regs);
}

function errorCB(regs) {
    return ({ error: reason });
}
module.exports = crud;