//Conseguir todos los eventos.
const { response } = require("express");
const getEvents = (req, res = response) => {
  res.json({
    ok: true,
    msg: "Eventos conseguidos!",
  });
};

//Crear un nuevo evento.

const createEvent = (req, res = response) => {
  res.json({
    ok: true,
    msg: "Evento creado!",
  });
};

//Actualizar un evento

const updateEvent = (req, res = response) => {
  const { id } = req.params;

  res.json({
    ok: true,
    msg: "Evento actualizado!",
    id,
  });
};

//Eliminar un evento

const deleteEvent = (req, res = response) => {
  res.json({
    ok: true,
    msg: "Evento eliminado!",
  });
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
