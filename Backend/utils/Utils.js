const jwt = require("jsonwebtoken");

function authenticattoken(req, res, next) {
  const authHeader = req.headers["Authorization"];
  const token = authHeader && authHeader.split("")[1];
  if (!token) return res.sendStatus(401);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(401);
      req.user = user;
      next();
    });
  } catch (error) {
    res.sendStatus(401);
  }
}

module.exports = {authenticattoken};
