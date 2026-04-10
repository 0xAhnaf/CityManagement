import express from "express";
import checkToken from "../Middlewares/checkToken.js";
import {
  createVolunteer,
  getVolunteersByEvent,
  checkVolunteer,
} from "../Controllers/volunteerController.js";

const route = express.Router();

route.post("/volunteers", checkToken, createVolunteer);

route.get("/volunteers/check/:eventId", checkToken, checkVolunteer);

route.get("/volunteers/:eventId", getVolunteersByEvent);

export default route;
