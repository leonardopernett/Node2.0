const {Router} = require('express');
const router = Router();

const  controller  = require('../controller/UserController')

router.get('/signup', controller.renderSignupForm)
router.get('/signin', controller.renderSigninForm)
router.post('/signup', controller.signup)
router.post('/signin', controller.signin) 
router.get('/logout', controller.logout)

module.exports = router ;