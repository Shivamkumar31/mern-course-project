const Course = require("../models/Course");
const parseCSV = require("../utils/csvParser");
const redis = require("../config/redis");


// 📥 Upload CSV
exports.uploadCourses = async (req, res) => {
  try {
    const courses = await parseCSV(req.file.path);

    await Course.insertMany(courses);

    res.json({ msg: "Courses uploaded successfully", count: courses.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 🔍 Search + Cache
exports.getCourses = async (req, res) => {
  try {
    const search = req.query.search || "";

    const cacheKey = `courses:${search}`;

    // ✅ Check Redis first
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      return res.json({
        source: "cache",
        data: JSON.parse(cachedData),
      });
    }

    // ❌ Not in cache → DB query
    const courses = await Course.find({
      title: { $regex: search, $options: "i" },
    });

    // ✅ Store in Redis (expiry 60 sec)
    await redis.set(cacheKey, JSON.stringify(courses), "EX", 60);

    res.json({
      source: "database",
      data: courses,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};