const { handleAddToCart, showCartList } = require('../controller/cartController')
const { isAuthneticated } = require('../middleware/isAuthenticated')

const router =require('express').Router()

router.route('/add-to-cart').post( isAuthneticated,handleAddToCart)
router.route('/cart-render').get(isAuthneticated,showCartList)

module.exports = router