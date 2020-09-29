const { User } = require('../../models');
const user = require('../../models/user');

module.exports = async (req, res) => {
    
    let count = await User.destroy({
        where: {
            id: req.user.id
        }
    });

    if(count === 0){
        return res.status(400).send('Invalid account');
    }

    res.status(204).send('deleted accounts successfully');

};
