/*
    Rutas de Usuario / Auth
    host + /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, loginUser, renewToken } = require("../controllers/auth");
const { fieldValidate } = require("../middlewares/fieldValidate");
const { jwtValidate } = require("../middlewares/jwtValidate");
const authRouter = Router();

authRouter.post(
  "/register",
  [
    check("name", "El nombre es requerido").not().isEmpty(),
    check("email", "El email no puede estar vacio").not().isEmpty(),
    check("email", "El email no es valido").isEmail(),
    check("password", "El password debe ser de minimo 6 caracteres").isLength({ min: 6 }),
    fieldValidate,
  ],
  createUser
);

authRouter.post(
  "/login",
  [
    check("email", "El email no puede estar vacio").not().isEmpty(),
    check("email", "El email no es valido").isEmail(),
    check("password", "La contrasenia debe ser mayor de 6 caracteres").isLength({ min: 6 }),
    fieldValidate,
  ],
  loginUser
);

authRouter.get("/renew", jwtValidate, renewToken);

module.exports = authRouter;
