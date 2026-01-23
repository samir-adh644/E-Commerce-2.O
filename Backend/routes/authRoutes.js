const { handleRegistration, handleLogin } = require('../controller/authController')

const router =require('express').Router()

router.route('/register').post(handleRegistration)
router.route('/login').post(handleLogin)
router

module.exports = router