const { renderOrders } = require('../controller/orderlistController')
const { isAuthneticated } = require('../middleware/isAuthenticated')

const  router = require('express').Router()

router.route('/order-list').get(isAuthneticated,renderOrders)


module.exports = router