const express = require("express")
const { sendMessageVerify, codeVerify, hazzardAccepted, hazzardOnWork, hazzardFinished, suggestionSent, addIdPhone } = require("../controllers/phoneController")
const router = express.Router()

router.get('/login',sendMessageVerify)
router.get('/verify',codeVerify)
router.post('/hazzardin',hazzardAccepted)
router.post('/hazzardon',hazzardOnWork)
router.post('/hazzardfinish',hazzardFinished)
router.post('/suggestion',suggestionSent)


module.exports = router