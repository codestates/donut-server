const { User } = require(__base + 'models');

module.exports = async (req, res) => {
    console.log('log out!!');
   let user = await User.update({ refreshToken: null },{
       where: {
            id: req.user.id,
       }
   });
   console.log('user: ', user);
   if(!user){
       return user.status(401).send('Invalid account');
   }

   res.clearCookie('refreshToken');
   res.status(204).send('logged out');
    
};  