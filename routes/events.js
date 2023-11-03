/*
    Rutas de Eventos / events
    host + /events/
*/

const { Router } = require("express");
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");
const { jwtValidate } = require("../middlewares/jwtValidate");
const { check } = require("express-validator");
const { fieldValidate } = require("../middlewares/fieldValidate");
const { isDate } = require("../helpers/isDate");
const { idChecker } = require("../helpers/idChecker");
const eventsRouter = Router();

//! Middleware
eventsRouter.use(jwtValidate);
eventsRouter.get("/", getEvents);
eventsRouter.post(
  "/",
  [
    check("title", "Debe ingresar el titulo del evento").not().isEmpty(),
    check("start", "Debe ingresar una fecha de inicio").custom(isDate),
    check("end", "Debe ingresar una fecha de finalizacion").custom(isDate),

    fieldValidate,
  ],
  createEvent
);
eventsRouter.put(
  "/:id",
  [
    check("title", "Debe ingresar el titulo del evento").not().isEmpty(),
    check("start", "Debe ingresar una fecha de inicio").custom(isDate),
    check("end", "Debe ingresar una fecha de finalizacion").custom(isDate),

    fieldValidate,
  ],
  updateEvent
);
eventsRouter.delete("/:id", idChecker, deleteEvent);
module.exports = eventsRouter;
