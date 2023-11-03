const { default: mongoose } = require("mongoose");

const idChecker = (req, res, next) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id))
    return res.status(401).json({ ok: false, msg: "Id vacio o invalido" });

  next();
};

module.exports = { idChecker };
