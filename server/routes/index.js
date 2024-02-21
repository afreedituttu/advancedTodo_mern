const router = require('express').Router()
const { authentication } = require('../middlewares/jwt.js')

const authRoutes = require('./auth.js')
const userRoutes = require('./user.js')
const todoRoutes = require('./todo.js')

router.use('/auth', authRoutes)
router.use('/user',  authentication, userRoutes)
router.use('/todo', authentication, todoRoutes)

module.exports = router