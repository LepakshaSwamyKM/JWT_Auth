const jwt = require("jsonwebtoken");

const Authenticator = async (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth)
    return res.status(401).json({ message: "Unauthorized,JWT is required" });
  try {
    const decodedToken = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized,JWT is required" });
  }
};

module.exports = Authenticator;
