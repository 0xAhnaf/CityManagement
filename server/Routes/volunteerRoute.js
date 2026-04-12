import express from "express";
import checkToken from "../Middlewares/checkToken.js";
import {
  createVolunteer,
  getVolunteersByEvent,
  checkVolunteer,
  updateVolunteerStatus,
  removeVolunteer,
  checkVolunteerByUserId,
} from "../Controllers/volunteerController.js";

const route = express.Router();

route.post("/volunteers", checkToken, createVolunteer);
route.get("/volunteers/check", checkToken, checkVolunteerByUserId);
route.get("/volunteers/check/:eventId", checkToken, checkVolunteer);
route.get("/volunteers/:eventId", getVolunteersByEvent);
route.patch("/volunteers/:id/status", checkToken, updateVolunteerStatus);
route.delete("/volunteers/:id", checkToken, removeVolunteer);

export default route;