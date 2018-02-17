/**
 * @module controllers/authentication
 * @author Jose de Jesus Alvarez Hernandez
 * @desc authentication Controllers
 */

const messages = require('./../messages');
const APIusersCRUD = require('./../models/crud/User');
const authUtil = require('./../utils/auth');
const fields = ['userId', 'name', 'email', 'status', 'homePage'];
const authentication = {
    login: login
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
*   ObjectsArray:
*     type: array   
*     items: 
*       type: object
*/
/**
 * @swagger
 * definitions:
 *   UserLoginObject:
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 */
/**
 * @swagger
 * definitions:
 *   UserObject:
 *     properties: 
 *       userId:
 *         type: string
 *       name:
 *         type: string  
 *       email:
 *         type: string
 *       status:
 *         type: number
 *       homePage:
 *         type: string 
 *       token: 
 *         type: string
 *         format: base64
 */

/**
* @swagger
* /api/authentication/login:
*   post:
*     tags:
*       - Authentication
*     description: Authenticate an USER
*     produces:
*       - application/json
*     parameters:
*       - name: User
*         description: User object
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/UserLoginObject'
*     responses:
*       200:
*         description: Successful request
*         schema:
*           $ref: '#/definitions/UserObject'
*       400:
*         description: Bad request
*         schema:
*           $ref: '#/definitions/error'
*       401:
*         description: Unauthorized access
*         schema:
*           $ref: '#/definitions/error'
*       404:
*         description: Resource not found
*         schema:
*           $ref: '#/definitions/error'
*/
function login(req, res, next) {
    if (!req.body || req.body.username === undefined || req.body.password === undefined) {
        res.send(400, { message: messages.badRequestError });
    } else {
        const credentials = {
            email: req.body.username,
            password: req.body.password,
        };
        const fields = ['userId', 'homePage', 'name', 'email', 'status'];
        APIusersCRUD.authenticate(credentials, fields).then((user) => {
            if (user !== null) {
                const userTokenObject = {
                    email: credentials.email,
                    password: credentials.password,
                    userId: user.userId,
                };
                const token = authUtil.tokenGeneration(userTokenObject);
                const userResponse = {
                    name: user.name,
                    email: user.email,
                    userId: user.userId,
                    status: user.status,
                    homePage: user.homePage,
                    token: token
                };
                res.send(200, userResponse);
            } else {
                res.send(401, { message: messages.wrongUserCredentials });
            }
        });
    }
    return next();
}


module.exports = authentication;