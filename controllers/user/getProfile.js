const { generateAccessToken } = require("../../lib/auth");

const { User } = require(__base + 'models');
const { getNeededUserInfo } = require(__base + 'lib/auth');

module.exports = async (req, res) => {
    const { email } = req.user;

    const user = await User.findOne({ where: { email } });

    if(!user){
        return res.status(404).send("Account does not Exist");
    }

    res.status(200).json(getNeededUserInfo(user.dataValues));
};