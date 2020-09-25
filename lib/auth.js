const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

const { ACCESS_TOKEN_SECRET } = process.env;

//middlewares

exports.authenticateToken = (req, res, next) => {
    const token = req.cookies['access_token'];

    if(!token){
        return res.status(401).send('You are not login');
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
}

//Utility

exports.generateAccessToken = (payload) => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '10h'});
}

exports.setPassword = (user) => {
    try{
        const buf = crypto.randomBytes(64);
        return crypto.pbkdf2Sync(user.password, buf.toString('base64'), 100024, 64, 'sha512')
            .toString('base64');
    } catch(e){
        console.error(e);
    }
}