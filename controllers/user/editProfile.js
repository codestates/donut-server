const { User } = require(__base + 'models');

module.exports = async (req, res) => {
  console.log('body: ', req.body);
  const userData = {
    ...req.body
  };

  const email = userData.email;  
  delete userData.email;

  let user = await User.update({ ...userData }, {
      where: {
        id: req.user.id,
        email
      }
  });

  if(!user){
      return res.status(400).send('invalid user data');
  }

  res.status(200).send('edited successfully');
};