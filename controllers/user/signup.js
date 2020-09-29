const { User } = require(__base + 'models');
const { setPassword } = require(__base + '/lib/auth');
 
module.exports = async (req, res) => {

    const { email, password, passwordConfirm, username, address, latlon } = req.body;
    console.log('body: ', req.body);
    if(password !== passwordConfirm){
        return res.status(403).send('Passwords are not identical');
    }
    
    const [hashedPassword, salt] = setPassword(password);
    console.log('hashed: ', salt);

    let [user, created] = await User.findOrCreate({
        where: {
            email
        },
        defaults: {
            password: hashedPassword,
            username,
            address,
            latlon,
            salt
        }
    });

    if(!created){
        return res.status(409).send('This email already exists');
    } 

    return res.status(201).send('Successfully registered');
};