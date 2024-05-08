require("dotenv").config();
const jwt = require("jsonwebtoken");

function authenticattoken(req, res) {
  const authHeader = req.headers["Authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.send("error due to no token");
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.send("error due to wrong token");
      req.user = user;
      next();
    });
  } catch (error) {
    res.sendStatus(401);
  }
}

module.exports = { authenticattoken };
