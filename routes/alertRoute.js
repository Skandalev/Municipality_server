const express = require("express");
const router = express.Router();
const alertModal = require("../models/alertModel");
require("dotenv").config();
const { allAlert, addAlert, deleteAlert, updateAlert } = require("../controllers/alertController");
const { protect, verifyTokenAndAuthorization,verifyTokenAdmin } = require("../middleware/authMiddleware")
router.get("/", allAlert);
router.post("/",verifyTokenAdmin, addAlert);
router.delete("/:id",verifyTokenAdmin, deleteAlert);
router.put("/:id",verifyTokenAdmin, updateAlert);

module.exports = router;
