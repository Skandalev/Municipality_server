const express = require('express')
const { registerUser,authUser, allUsers,patchUser } = require('../controllers/userControllers')
const { protect,verifyTokenAdmin,verifyTokenAndAuthorization } = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/',registerUser)
router.post('/login',authUser)
router.get('/',verifyTokenAdmin,allUsers)
router.patch('/:id',verifyTokenAndAuthorization,patchUser)


module.exports = router