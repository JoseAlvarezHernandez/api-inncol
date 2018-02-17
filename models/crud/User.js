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
    authenticate: authenticate,
    save: save,
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

function authenticate(credentials, fields) {
    let query = APIUser.findOne(credentials);
    query.select(fields.join(' '));
    return query.exec().then(successCB, errorCB);
};

function save(user) {
    let APIUserResource = new APIUser(user);
    return APIUserResource.save().then(
        (saved) => {
            return (saved);
        },
        (reason) => {
            return ({ error: reason });
        }
    );
};

function successCB(regs) {
    return (regs);
}

function errorCB(regs) {
    return ({ error: reason });
}
module.exports = crud;