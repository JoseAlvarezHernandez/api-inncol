/**
 * @module controllers/users
 * @author Jose de Jesus Alvarez Hernandez
 * @desc Users Controllers
 */
const messages = require('./../messages');
const APIusersCRUD = require('./../models/crud/User');
const fields = ['userId', 'name', 'email', 'status', 'homePage'];
const users = {
    getAll: getAll,
    getUser: getUser
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
 *       userId:
 *         type: string
 *       name:
 *         type: string  
 *       email:
 *         type: string 
 *       password:
 *         type: string 
 *       homePage:
 *         type: string
 */
/**
 * @swagger
 * definitions:
 *   UserGetId:
 *     properties:  
 *       email:
 *         type: string 
 *       status:
 *         type: number
 */
/**
 * @swagger
 * definitions:
 *   APIUserSaved:
 *     properties: 
 *       userId:
 *         type: string
 *       name:
 *         type: string  
 *       email:
 *         type: string 
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
 *       userId:
 *         type: string 
 *       status:
 *         type: number
 *       created_at:
 *         type: date
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


/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     tags:
 *       - Users
 *     description: Get User by User Id
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: User Id requesting
 *         in: path
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