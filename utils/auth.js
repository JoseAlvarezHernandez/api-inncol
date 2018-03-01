const jwt = require('jsonwebtoken');
const APIUserCRUD = require('../models/crud/User');
exports.tokenGeneration = (source) => {
    let token = jwt.sign(
        {
            user: source,
        }, process.env.hash || 'shh', {
            expiresIn: '2h',
        }
    );
    return token;
};

exports.tokenValidation = (authBearerString) => {
    if (authBearerString.indexOf('Bearer') == -1)
        return false;

    const token = authBearerString.replace('Bearer ', '');
    try {
        result = jwt.verify(token, process.env.hash || 'shh');
        const fields = ['email'];
        const credentials = {
            email: result.user.email,
            password: result.user.password
        };
        APIUserCRUD.authenticate(credentials, fields)
            .then((user) => {
                if (user !== null) {
                    result = true;
                } else {
                    result = false;
                }
            });
    } catch (error) {
        result = false;
    }
    return result;
}