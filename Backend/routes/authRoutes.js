const { handleRegistration } = require('../controller/authController')

const router =require('express').Router()

router.route('/register').post(handleRegistration)

module.exports = router