const { User } = require('../../models');
 
module.exports = async (req, res) => {

    const { email, password, passwordConform, username, address, latlon } = req.body;

    if(password !== passwordConform){
        return res.status(403).send('Passwords are not identical');
    }

    [user, created] = await User.findOrCreate({
        where: {
            email
        },
        defaults: {
            password,
            username,
            address,
            latlon
        }
    });

    if(!created){
        return res.status(409).send('This email already exists');
    } 

    return res.status(201).send('Successfully registered');
};