/*
    Rutas de Eventos / events
    host + /events/
*/

const { Router } = require("express");
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");
const { jwtValidate } = require("../middlewares/jwtValidate");
const eventsRouter = Router();

eventsRouter.get("/", jwtValidate, getEvents);
eventsRouter.post("/", jwtValidate, createEvent);
eventsRouter.put("/:id", jwtValidate, updateEvent);
eventsRouter.delete("/:id", jwtValidate, deleteEvent);
module.exports = eventsRouter;
