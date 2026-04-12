import Volunteer from "../Models/volunteerModel.js";
import Event from "../Models/eventModel.js"

// ENROLL
export const createVolunteer = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId, phone, age } = req.body;

    const exists = await Volunteer.findOne({ userId, eventId });
    if (exists) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    const newVolunteer = new Volunteer({
      userId,
      eventId,
      phone,
      age,
      status: "active",
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

export const checkVolunteerByUserId = async (req, res) => {
  try {
    const userId = req.user.id;

    const exists = await Volunteer.findOne({ userId });

    let nextEventDate = null;

    if (exists) {
      const today = new Date().toISOString().split("T")[0];

      const nextEvent = await Event.findOne({
        date: { $gte: today },
      }).sort({ date: 1 });

      if (nextEvent) {
        nextEventDate = nextEvent.date;
      }
    }

    res.json({
      enrolled: !!exists,
      nextEventDate,
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// GET ALL VOLUNTEERS FOR AN EVENT (admin)
export const getVolunteersByEvent = async (req, res) => {
  try {
    const data = await Volunteer.find({ eventId: req.params.eventId }).populate(
      "userId",
      "name email",
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// UPDATE STATUS (admin)
export const updateVolunteerStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// REMOVE VOLUNTEER (admin)
export const removeVolunteer = async (req, res) => {
  try {
    await Volunteer.findByIdAndDelete(req.params.id);
    res.json({ message: "Volunteer removed" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
