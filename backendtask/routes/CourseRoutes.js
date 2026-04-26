const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  uploadCourses,
  getCourses,
} = require("../controllers/courseController");

const auth = require("../middleware/authMiddleware");

// Upload CSV (protected)
router.post("/upload", auth, upload.single("file"), uploadCourses);

// Search courses
router.get("/", getCourses);

module.exports = router;