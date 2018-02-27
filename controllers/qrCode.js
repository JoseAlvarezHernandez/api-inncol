/**
 * @module controllers/qrCode
 * @author Jose de Jesus Alvarez Hernandez
 * @desc qrCode Controllers
 */
const messages = require('./../messages');
const APIqrCodeCRUD = require('./../models/crud/qrCode');

const fields = ['initDate', 'endDate', 'shortenURl', 'createdBy', 'created_at'];
const qrCode = {
    getQr: getQr,
    postQr: postQr
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
 *   APIQR:
 *     properties: 
 *       qrCodeId:
 *         type: number
 *       initDate:
 *         type: string
 *         format : date
 *       endDate:
 *         type: string
 *         format : date
 *       shortenURl:
 *         type: string 
 *       createdBy:
 *         type: number
 */
/**
 * @swagger
 * /api/code/{qrCodeId}:
 *   get:
 *     tags:
 *       - QR Code
 *     description: Get dates for QR Codes
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: qrCodeId
 *         description: QR ID
 *         in: path
 *         required: true
 *         type: Number
 *     responses:
 *       200:
 *         description: Sucessful request
 *         schema:
 *           $ref: '#/definitions/APIQR'
 *       400:
 *         description: Bad request 
 *         schema:
 *           $ref: '#/definitions/error'
 *       401:
 *         description: Unauthorized access 
 *         schema:
 *           $ref: '#/definitions/error'
 *       404:
 *         description: QR not found 
 *         schema:
 *           $ref: '#/definitions/error'
 */
function getQr(request, response, next) {
    const qrCodeId = parseInt(request.params.qrCodeId);
    if (!isNaN(qrCodeId)) {
        const conditions = { qrCodeId: qrCodeId };
        APIqrCodeCRUD.findWhere(fields, conditions).then(
            function (qrCode) {
                response.send(200, qrCode);
            }, function (reason) {
                response.send(400, { message: reason });
            }
        );
    } else {
        response.send(400, { message: messages.badRequestError });
    }
    return next();
}
/**
 * @swagger
 * /api/code:
 *   post:
 *     tags:
 *       - QR Code
 *     description: Get dates for QR Codes
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: qrCode
 *         description: QR Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/APIQR'
 *     responses:
 *       200:
 *         description: Sucessful request
 *         schema:
 *           $ref: '#/definitions/APIQR'
 *       400:
 *         description: Bad request 
 *         schema:
 *           $ref: '#/definitions/error'
 *       401:
 *         description: Unauthorized access 
 *         schema:
 *           $ref: '#/definitions/error'
 *       404:
 *         description: QR not found 
 *         schema:
 *           $ref: '#/definitions/error'
 */
function postQr(request, response, next) {
    if (request.params.qrCodeId === undefined || !request.params.initDate || !request.params.endDate || !request.params.shortenURl || request.params.createdBy === undefined) {
        response.send(400, { message: messages.badRequestError });
    } else {
        APIqrCodeCRUD.save(request.params).then(function (reg) {
            if (!reg.error) {
                const responseqr = {
                    qrCodeId: reg.qrCodeId,
                    initDate: reg.initDate,
                    endDate: reg.endDate,
                    shortenURl: reg.shortenURl,
                    createdBy: reg.createdBy,
                };
                response.send(200, responseqr);
            } else {
                response.send(500, { message: reg.error.message });
            }
        });
    }
    return next();
}

module.exports = qrCode;