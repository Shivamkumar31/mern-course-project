const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: "No token" });
  }

  // ✅ REMOVE "Bearer "
  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  try {
    const decoded = jwt.verify(token, "secret"); // same secret as login
    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message); // debug
    return res.status(401).json({ msg: "Invalid token" });
  }
};