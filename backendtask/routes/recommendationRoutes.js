const router = require("express").Router();
const { getRecommendations } = require("../controllers/recommendationController");

// POST /api/recommendations
router.post("/", getRecommendations);

module.exports = router;