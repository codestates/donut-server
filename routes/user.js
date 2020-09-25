const userControllers = require('../controllers/user');
const router = require('express').Router();
const { authenticateToken } = require(__base + 'lib/auth');

router.post('/signup', userControllers.signup);
router.post('/signin', userControllers.signin);
router.post('/signout', userControllers.signout);
router.get('/profile', authenticateToken, userControllers.getProfile);
router.put('/profile', userControllers.editProfile);
router.delete('/profile', userControllers.deleteProfile);

module.exports = router;