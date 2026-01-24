const { uploadProduct, displayProduct, displaySingleProduct } = require('../controller/productController')
const multer = require("multer")
const { storage } = require("../middleware/multerConfig") // whatever you named it
const upload = multer({ storage })


const router = require('express').Router()

router.route('/upload-product').post(upload.single("image"),uploadProduct)
router.route('/renderProduct').get(displayProduct)
router.route('/product/:id').get(displaySingleProduct)

module.exports = router ;