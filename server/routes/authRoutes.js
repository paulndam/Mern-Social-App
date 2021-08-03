const express = require('express')
const authController = require('../controller/authController')


const router = express.Router()


router.route('/auth/signin').post(authController.signin)
router.route('/auth/signout').get(authController.signout)

module.exports = router;