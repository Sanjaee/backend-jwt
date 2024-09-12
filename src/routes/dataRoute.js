const express = require("express");
const router = express.Router();
const { createData, getAllData } = require("../controller/dataController");
const { authenticateToken } = require("../middleware/authMiddleware");

router.post("/data",authenticateToken, createData);
router.get("/data",authenticateToken, getAllData);

module.exports = router;
