const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");
require("dotenv/config");

const authError = () => {
  throw new AuthenticationError("Autenticação necessária");
};

const authorize = (req, verify = false) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    req.isAuth = false;
    return !verify ? authError() : req;
  }

  const token = authorizationHeader.replace("Bearer ", "");

  if (!token || token === "") {
    req.isAuth = false;
    return !verify ? authError() : req;
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      req.isAuth = false;
      return !verify ? authError() : req;
    }

    req.isAuth = true;
    req._id = decoded._id;
    req.email = decoded.email;
    req.token = token;

    return req;
  } catch (error) {
    req.isAuth = false;

    return !verify ? authError() : req;
  }

  return req;
};

module.exports = authorize;
