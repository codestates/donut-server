const { User } = require(__base + 'models');
const { generateAccessToken, checkPassword } = require(__base + 'lib/auth');

module.exports = async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({
        where: {
            email,
        }
    });

    if(!user){
        return res.status(404).send("Email does not exist");
    }
    
    if(!checkPassword(user, password)){
        return res.status(403).end('Password incorrect');
    } 

    let token;
    try{
        token = generateAccessToken(user);
    } catch(e){
        console.error('Failed to generate token: ', e);
        return res.sendStatus(403);
    } 

    res.status(200).send(token);
};