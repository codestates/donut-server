const { User } = require(__base + 'models');
const { getNeededUserInfo } = require(__base + 'lib/auth');

module.exports = async (req, res) => {
    const { id } = req.user;

    const user = await User.findByPk(id);

    if(!user){
        return res.status(404).send("Account does not Exist");
    }

    res.status(200).json(getNeededUserInfo(user.dataValues));
};