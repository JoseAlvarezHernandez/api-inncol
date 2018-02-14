/**
 * @module routes/pathTree
 * @author Jose de Jesus Alvarez Hernandez
 * @desc pathTree Routes
 */
const users = require('./../controllers/users');
const swaggerDoc = require('./../configs/swagger');
const restify = require('restify');
const pathTree = {
    middlewares: [
        {
            pattern: '*',
            callbacks: [middleware, middleware]
        }
    ],
    allowedMethods: {
        get: fakeController,
    },
    subPaths: {
        api: {
            subPaths: {
                users: {
                    allowedMethods: {
                        get: users.getAll
                    },
                    subPaths: {
                        ':userId': {
                            allowedMethods: {
                                get: users.getUser,
                                put: fakeController,
                                del: fakeController,
                                patch: fakeController,
                            }
                        }
                    }
                },
                register: {
                    allowedMethods: {
                        get: fakeController,
                        post: fakeController
                    }
                }
            }
        },
    }
}
function middleware(req, res, next) {
    return next()
}
function fakeController(req, res) {
    res.send(200, `Welcome to ${process.env.name}'s API`)
}
function swagger(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDoc);
}
module.exports = pathTree;