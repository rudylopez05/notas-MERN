const { Router } = require('express');
const router = Router();
const {signIn, signOut, signUp, user} = require('../controllers/auth.controller');
const verifyToken = require('../controllers/verifyToken');



router.route('/user').get(user,verifyToken)
router.route('/signIn').post(signIn)
router.route('/signOut').post(signOut)
router.route('/signUp').post(signUp)



module.exports = router;