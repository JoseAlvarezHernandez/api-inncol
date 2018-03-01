/**
 * @module controllers/users
 * @author Jose de Jesus Alvarez Hernandez
 * @desc Users Controllers
 */
const messages = require('./../messages');
const APIusersCRUD = require('./../models/crud/User');
const authUtil = require('./../utils/auth');

const fields = ['name', 'email', 'status', 'homePage', 'created_at', 'phone'];
const users = {
    getAll: getAll,
    getUser: getUser,
    addUser: addUser,
}
/**
 * @swagger
 * definitions:
 *   error:
 *     properties:
 *       code:
 *         type: integer
 *       message:
 *         type: string
 */
/**
 * @swagger
 * definitions:
 *   UserStatus:
 *     properties: 
 *       status:
 *         type: number
 */
/**
 * @swagger
 * definitions:
 *   UserUpdate:
 *     properties: 
 *       name:
 *         type: string
 *       homePage:
 *         type: string
 */
/**
 * @swagger
 * definitions:
 *   APIUser:
 *     properties: 
 *       name:
 *         type: string  
 *       email:
 *         type: string 
 *       password:
 *         type: string 
 *       homePage:
 *         type: string
 *       phone:
 *         type: number
 */
/**
 * @swagger
 * definitions:
 *   APIUserSaved:
 *     properties: 
 *       name:
 *         type: string  
 *       email:
 *         type: string 
 *       password:
 *         type: string 
 *       homePage:
 *         type: string
 *       phone:
 *         type: number
 */

/**
 * @swagger
 * definitions:
 *   UserDeleteObject:
 *     properties: 
 *       username:
 *         type: string
 */
/**
 * @swagger
 * definitions:
 *   UserGet:
 *     properties: 
 *       name:
 *         type: string  
 *       email:
 *         type: string 
 *       created_at:
 *         type: string
 *         format: date
 *       phone:
 *         type: number
 */
/**
* @swagger
* definitions:
*   Users:
*     type: array   
*     items: 
*       $ref: '#/definitions/UserGet'
*/

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     description: Get users
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: Bearer authorization string
 *         in: header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Sucessful request
 *         schema:
 *           $ref: '#/definitions/Users'
 *       400:
 *         description: Bad request 
 *         schema:
 *           $ref: '#/definitions/error'
 *       401:
 *         description: Unauthorized access 
 *         schema:
 *           $ref: '#/definitions/error'
 *       404:
 *         description: User not found 
 *         schema:
 *           $ref: '#/definitions/error'
 */
function getAll(request, response, next) {
    if (!request.header('Authorization')) {
        response.send(400, { message: messages.badRequestError });
    } else {
        let authToken = request.header('Authorization');
        let userValidation = authUtil.tokenValidation(authToken);
        if (!userValidation) {
            response.send(401, { message: messages.expiredTokenError });
        } else {
            APIusersCRUD.findAll(fields).then(
                function (users) {
                    response.send(200, users);
                },
                function (reason) {
                    response.send(400, { message: reason });
                }
            );
        }
    }
    return next();
}

/**
 * @swagger
 * /api/users/{email}:
 *   get:
 *     tags:
 *       - Users
 *     description: Get User by User Id
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: User email requesting
 *         in: path
 *         required: true
 *         type: string
 *       - name: Authorization
 *         description: Bearer authorization string
 *         in: header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Sucessful request
 *         schema:
 *           $ref: '#/definitions/Users'
 *       400:
 *         description: Bad request 
 *         schema:
 *           $ref: '#/definitions/error'
 *       401:
 *         description: Unauthorized access 
 *         schema:
 *           $ref: '#/definitions/error'
 *       404:
 *         description: User not found 
 *         schema:
 *           $ref: '#/definitions/error'
 */
function getUser(request, response, next) {
    if (!request.header('Authorization')) {
        response.send(400, { message: messages.badRequestError });
    } else {
        const email = parseInt(request.params.email);
        let authToken = request.header('Authorization');
        let userValidation = authUtil.tokenValidation(authToken);
        if (!userValidation) {
            response.send(401, { message: messages.expiredTokenError });
        } else {
            const conditions = { deleted: { $ne: true }, email: email };
            APIusersCRUD.findWhere(fields, conditions).then(
                function (user) {
                    response.send(200, user);
                }, function (reason) {
                    response.send(400, { message: reason });
                }
            );
        }
    }
    return next();
}
/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     description: Saves User
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: Bearer authorization string
 *         in: header
 *         required: true
 *         type: string
 *       - name: User
 *         description: user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/APIUser'
 *     responses:
 *       200:
 *         description: Sucessful request
 *         schema:
 *           $ref: '#/definitions/APIUserSaved'
 *       400:
 *         description: Bad request 
 *         schema:
 *           $ref: '#/definitions/error'
 *       401:
 *         description: Unauthorized access 
 *         schema:
 *           $ref: '#/definitions/error'
 *       404:
 *         description: User not found 
 *         schema:
 *           $ref: '#/definitions/error'
 */
function addUser(request, response, next) {
    if (!request.header('Authorization')) {
        response.send(400, { message: messages.badRequestError });
    } else {
        if (!request.params.name || !request.params.email || !request.params.password || !request.params.homePage || !request.params.phone) {
            response.send(400, { message: messages.badRequestError });
        } else {
            let authToken = request.header('Authorization');
            let userValidation = authUtil.tokenValidation(authToken);
            if (!userValidation) {
                response.send(401, { message: messages.expiredTokenError });
            } else {
                const APIuser = {
                    name: request.params.name,
                    email: request.params.email,
                    password: request.params.password,
                    phone: request.params.phone,
                    status: 0,
                    homePage: request.params.homePage,
                    createdBy: userValidation.user.email,
                    deleted: false,
                };
                APIusersCRUD.save(APIuser).then((reg) => {
                    if (!reg.error) {
                        const responseUser = {
                            name: reg.name,
                            email: reg.email,
                            status: reg.status,
                        };
                        response.send(200, responseUser);
                    } else {
                        response.send(500, { message: reg.error.message });
                    }
                });
            }
        }
    }
};
module.exports = users;