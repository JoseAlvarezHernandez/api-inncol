/**
 * @module models/crud/log
 * @author Jose de Jesus Alvarez Hernandez
 * @desc APILog model CRUD operations
 */

/** API log Model  */
const APIlog = require('../Log');

const crud = {
    save: save,
}

function save(log) {
    let nLog = new APIlog(log);
    return nLog.save().then(successCB, errorCB);
};

function successCB(regs) {
    return (regs);
}

function errorCB(reason) {
    return ({ error: reason });
}
module.exports = crud;