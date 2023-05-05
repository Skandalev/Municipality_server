const express = require("express")
const router = express.Router()
const {allSuggestions,addSuggestion,deleteSuggestion} = require('../controllers/suggestinsController')
const { protect, verifyTokenAndAuthorization,verifyTokenAdmin } = require("../middleware/authMiddleware")


router.post('/:id',verifyTokenAndAuthorization,addSuggestion)
router.get('/',verifyTokenAdmin,allSuggestions)
router.delete('/',verifyTokenAdmin,deleteSuggestion)

module.exports = router