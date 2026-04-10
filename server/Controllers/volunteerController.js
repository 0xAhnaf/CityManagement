import Volunteer from "../Models/volunteerModel.js";

// ENROLL
export const createVolunteer = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId } = req.body;

    const exists = await Volunteer.findOne({ userId, eventId });

    if (exists) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    const newVolunteer = new Volunteer({
      userId,
      eventId,
    });

    const saved = await newVolunteer.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// CHECK IF ENROLLED
export const checkVolunteer = async (req, res) => {
  try {
    const userId = req.user.id;
    const eventId = req.params.eventId;

    const exists = await Volunteer.findOne({ userId, eventId });

    res.json({ enrolled: !!exists });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// (optional admin)
export const getVolunteersByEvent = async (req, res) => {
  try {
    const data = await Volunteer.find({ eventId: req.params.eventId });
    res.json(data);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
