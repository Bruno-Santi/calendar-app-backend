//Conseguir todos los eventos.
const { response } = require("express");

const Event = require("../models/Event");
const { default: mongoose } = require("mongoose");
const getEvents = async (req, res = response) => {
  try {
    const events = await Event.find({}).populate("user", "name");
    if (!events) res.status(404).json({ ok: false, msg: "No se encontraron eventos" });
    res.status(201).json({
      ok: true,
      msg: "Eventos conseguidos!",
      events,
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

//Crear un nuevo evento.

const createEvent = async (req, res = response) => {
  const newEvent = new Event(req.body);

  try {
    newEvent.user = req.uid;
    const savedEvent = await newEvent.save();
    res.status(201).json({
      ok: true,
      savedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

//Actualizar un evento

const updateEvent = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { uid } = req;

    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ ok: false, msg: "Evento no encontrado" });
    if (event.user.toString() !== uid) return res.status(401).json({ ok: false, msg: "Usuario no autorizado" });

    const newEvent = {
      ...req.body,
      user: uid,
    };
    const updatedEvent = await Event.findByIdAndUpdate(id, newEvent, { new: true });
    res.status(201).json({
      ok: true,
      evento: updatedEvent,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      msg: "Debe hablar con el administrador",
    });
  }
};

//Eliminar un evento

const deleteEvent = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { uid } = req;

    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ ok: false, msg: "Evento no encontrado" });
    if (event.user.toString() !== uid) return res.status(404).json({ ok: false, msg: "Usuario no autorizado" });
    const removedEvent = await Event.deleteOne({ _id: id });
    res.status(201).json({ ok: true, msg: "Evento eliminado con exito", removedEvent });
  } catch (error) {
    console.log(error);
    res.status(401).json({ ok: false, msg: "Debe hablar con el administrador" });
  }
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
