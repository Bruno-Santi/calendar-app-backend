const jwt = require("jsonwebtoken");
require("dotenv").config();
const generateJWT = (uid, name) => {
  const { SECRET_JWT_SEED } = process.env;

  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    jwt.sign(
      payload,
      SECRET_JWT_SEED,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        }
        resolve(token);
      }
    );
  });
};

module.exports = { generateJWT };
