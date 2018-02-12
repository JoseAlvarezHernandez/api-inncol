/** 
 * @module routes/init 
 * @author Jose de Jesus Alvarez Hernandez
 * @desc Init API routes  
 */

/** 
 * Express instance 
 */
const express = require('express');
/** 
 * Express Router instance 
 */
const router = express.Router();

/**
 * Init get
 */
router.get('/', (req, res) => {
    res.send('Welcome to INNCOL\'s API');
});
/**
 * serve swagger
 */
router.get('/api/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swagger);
});

module.exports = router;