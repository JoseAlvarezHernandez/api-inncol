/**
 * @module routes/pathTree
 * @author Jose de Jesus Alvarez Hernandez
 * @desc pathTree Routes
 */
const users = require('./../controllers/users');
const authentication = require('./../controllers/authentication');
const qrCode = require('./../controllers/qrCode');
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
                'swagger.json': {
                    allowedMethods: {
                        get: swagger
                    }
                },
                code: {
                    allowedMethods: {
                        post: qrCode.postQr,
                        get: qrCode.getAll,
                    },
                    subPaths: {
                        ':qrCodeId': {
                            allowedMethods: {
                                get: qrCode.getQr,
                            }
                        }
                    }
                },
                authentication: {
                    subPaths: {
                        'login': {
                            allowedMethods: {
                                post: authentication.login
                            }
                        }
                    }
                },
                users: {
                    allowedMethods: {
                        get: users.getAll,
                        post: users.addUser,
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
                },
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