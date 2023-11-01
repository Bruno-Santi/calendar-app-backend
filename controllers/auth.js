const { request, response } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const createUser = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(401).json({
        ok: false,
        msg: "El correo ya existe",
      });
    }
    user = new User(req.body);
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    await user.save();

    res.status(201).json({
      ok: true,
      msg: "Registro exitoso!",
      uid: user.id,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        ok: false,
        msg: "Usuario/Contraseña incorrecto",
      });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario/Contraseña incorrecto",
      });
    }
    res.status(200).json({
      ok: true,
      msg: "Login Exitoso!",
      uid: user.id,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const renewToken = (req, res) => {
  res.json({
    ok: true,
    msg: "Renew",
  });
};

module.exports = { createUser, loginUser, renewToken };
