/**
 * @module routes/pathTree
 * @author Jose de Jesus Alvarez Hernandez
 * @desc pathTree Routes
 */
const users = require('./../controllers/users');
const pathTree = {
    middlewares: [
        {
            pattern: '*',
            callbacks: [middleware, middleware]
        }
    ],
    allowedMethods: {
        get: fakeController,
        post: fakeController,
        del: fakeController
    },
    subPaths: {
        user: {
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
    },
}
function middleware(req, res, next) {
    req.count = 1;
    return next()
}
function fakeController(req, res) {
    req.count = (req.count) ? req.count + 1 : 0;
    res.send(200, { count: req.count, path: req.route.path })
}
module.exports = pathTree;