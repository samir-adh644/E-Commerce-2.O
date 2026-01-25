const { handleAddToCart } = require('../controller/cartController')
const { isAuthneticated } = require('../middleware/isAuthenticated')

const router =require('express').Router()

router.route('/add-to-cart').post( isAuthneticated,handleAddToCart)

module.exports = router