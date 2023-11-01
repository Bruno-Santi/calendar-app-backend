const { request, response } = require("express");

const createUser = (req = request, res = response) => {
  const { name, email, password } = req.body;

  res.status(201).json({
    ok: true,
    msg: "Registro",
    name,
    email,
    password,
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  res.status(200).json({
    ok: true,
    msg: "Login",
    email,
    password,
  });
};

const renewToken = (req, res) => {
  res.json({
    ok: true,
    msg: "Renew",
  });
};

module.exports = { createUser, loginUser, renewToken };
