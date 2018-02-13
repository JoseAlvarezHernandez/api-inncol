
const messages = require('./../messages');
const APIusersCRUD = require('./../models/crud/User');
const fields = ['userId', 'name', 'email', 'status', 'homePage'];
const users = {
    getAll: getAll,
    getUser: getUser
}

function getAll(request, response, next) {
    APIusersCRUD.findAll(fields).then(function (users) {
        response.send(200, users)
    });
}
function getUser(request, response, next) {
    const userId = parseInt(request.params.userId);
    if (!isNaN(userId)) {
        const conditions = { deleted: { $ne: true }, userId: userId };
        APIusersCRUD.findWhere(fields, conditions).then(function (user) {
            response.send(200, user)
        });
    } else {
        response.send(400, { message: messages[400] })
    }
}
module.exports = users;