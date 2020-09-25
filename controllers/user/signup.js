const { User } = require(__base + 'models');
 
module.exports = async (req, res) => {

    const { email, password, passwordConfirm, username, address, latlon } = req.body;

    if(password !== passwordConfirm){
        return res.status(403).send('Passwords are not identical');
    }

    let [user, created] = await User.findOrCreate({
        where: {
            email
        },
        defaults: {
            password,
            username,
            address,
            latlon,
            salt: null
        }
    });

    if(!created){
        return res.status(409).send('This email already exists');
    } 

    return res.status(201).send('Successfully registered');
};