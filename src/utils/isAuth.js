const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");
require("dotenv/config");

const authorize = (req) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    req.isAuth = false;
    throw new AuthenticationError("Autenticação necessária");
  }

  const token = authorizationHeader.replace("Bearer ", "");

  if (!token || token === "") {
    req.isAuth = false;
    throw new AuthenticationError("Autenticação necessária");
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      req.isAuth = false;
      throw new AuthenticationError("Autenticação necessária");
    }

    req.isAuth = true;
    req._id = decoded._id;
    req.email = decoded.email;
  } catch (error) {
    req.isAuth = false;

    throw new AuthenticationError("Token inválido");
  }

  return req;
};

module.exports = authorize;
