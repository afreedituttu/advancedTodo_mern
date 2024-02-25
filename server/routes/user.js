const router = require('express').Router()
const { private_details, get_profile, update_profile, delete_profile } = require('../controllers/user')

router.get('/private', private_details)
router.get('/', get_profile)
router.put('/', update_profile)
router.delete('/', delete_profile)

module.exports = router