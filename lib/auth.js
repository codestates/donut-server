const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

const { ACCESS_TOKEN_SECRET } = process.env;
const [iteration, len, alg] = [100024, 64, 'sha512'];
//middlewares

exports.authenticateToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if(!header){
        return res.status(401).send('You are not login');
    }

    const token = header.split(' ')[1];

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){
            return res.sendStatus(403);
        }
        
        console.log('verify: ', user);
        req.user = user;
        next();
    });
};

//Utility

exports.generateAccessToken = (user) => {
    const { id, email, username, createdAt } = user.dataValues;
    let userInfo = {
        id,
        email,
        username,
        createdAt
    };
    console.log('user: ', userInfo);

    return jwt.sign(userInfo, ACCESS_TOKEN_SECRET, { expiresIn: '1h'});
};

exports.setPassword = (password) => {
    try{
        const buf = crypto.randomBytes(64);
        const salt = buf.toString('base64');
        const newPassword = crypto.pbkdf2Sync(password, salt, iteration, len, alg)
            .toString('base64');

            return [newPassword, salt];
    } catch(e){
        console.error(e);
    }
};

exports.checkPassword = (user, password) => {
    //console.log('hash: ', password, '|||||||||||||||||||||||', user.salt);
    const hashedPassword = crypto.pbkdf2Sync(password, user.salt, iteration, len, alg)
     .toString('base64');
 
    return hashedPassword === user.password;
}

exports.getNeededUserInfo = user => {
    delete user.password;
    return user;
}