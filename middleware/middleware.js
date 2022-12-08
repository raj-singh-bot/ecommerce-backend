const jwt = require('jsonwebtoken')
const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
}


const requireSignin = (req, res, next) => {
    // try{
      if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      if(!token) return res.status(400).json({msg: 'token not provided'})
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return catchError(err, res);
        }
        req.user = decoded;
        next();
      })
    }
    // } else {
    //   return res.status(400).json({ message: "Authorization required" });
    // }
    // next();
  // }catch(error){
  //   console.log(error)
  //   res.status(500).json({error:error.messages})
  // }
    //jwt.decode()
};

const adminMiddleware = (req, res, next) => {
  console.log(req.user.role)
  if(req.user.role !== "admin"){
    return res.status(400).json({ message: "Admin access denied" });
  }
  next()
}

module.exports = { requireSignin, adminMiddleware}