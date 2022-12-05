const jwt = require('jsonwebtoken')

const requireSignin = (req, res, next) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
    } else {
      return res.status(400).json({ message: "Authorization required" });
    }
    next();
    //jwt.decode()
};

const adminMiddleware = (req, res, next) => {
  if(req.user.role !== "admin"){
    return res.status(400).json({ message: "Admin access denied" });
  }
  next()
}

module.exports = { requireSignin, adminMiddleware}