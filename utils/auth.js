const jwt = require('jsonwebtoken');
exports.tokenGeneration = (source) => {
    let token = jwt.sign(
        {
            user: source,
        }, process.env.hash, {
            expiresIn: '2h',
        }
    );
    return token;
};