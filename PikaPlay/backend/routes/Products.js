const express = require('express')
const router = express.Router();

const controller = require('../controller/Products')

//logic for requests in typical api
router.get("/get-products", controller.getAll)

module.exports = router