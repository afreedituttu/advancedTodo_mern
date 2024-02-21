const router = require('express').Router()
const { private_details } = require('../controllers/user')

router.get('/private', private_details)

module.exports = router