const { User } = require(__base + 'models');
const { setPassword, checkPassword } = require(__base + 'lib/auth');

module.exports = async (req, res) => {
    const { currentPassword, password, passwordConfirm } = req.body;
    console.log('password: ', currentPassword, password, passwordConfirm);
    if(password !== passwordConfirm){
        return res.status(400).send('New password is not identical');
    }

    let user = await User.findByPk(req.user.id);

    if(!user){
        return res.status(404).send('Invalid Account');
    }
    console.log('user: ', user.dataValues);
    if(!checkPassword(user.dataValues, currentPassword)){
        return res.status(403).send('Incorrect password');
    }

    try{
        const [hashedPassword, salt] = setPassword(password);
        user.password = hashedPassword;
        user.salt = salt;
        user.save({
            fields: ['password', 'salt']
        });
    } catch(e){
        console.error(e);
        return res.status(500).send("Can not save new password");
    }

    res.status(204).send('Change password successfully');

}