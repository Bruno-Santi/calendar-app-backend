const { request, response } = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtValidate = (req = request, res = response, next) => {
  // x-token headers
  const { SECRET_JWT_SEED } = process.env;
  const token = req.header("x-token");
  console.log(token);
  console.log(SECRET_JWT_SEED);
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Falta el token",
    });
  }
  try {
    const { uid, name } = jwt.verify(token, SECRET_JWT_SEED);

    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token invalido",
    });
  }

  next();
};

module.exports = { jwtValidate: jwtValidate };
