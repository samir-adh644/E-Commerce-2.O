const { renderOrders, storeBuyMe } = require('../controller/orderlistController')
const { isAuthneticated } = require('../middleware/isAuthenticated')

const  router = require('express').Router()

router.route('/buy-now').post(isAuthneticated,storeBuyMe)
router.route('/order-list').get(isAuthneticated,renderOrders)


module.exports = router