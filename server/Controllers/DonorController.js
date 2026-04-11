import Donor from "../Models/DonorModel.js";

export const registerDonor = async (req, res) => {
  try {
    const { name, phone, bloodGroup, district, age, lastDonated } = req.body;

    const existing = await Donor.findOne({ user: req.user.id });
    if (existing) {
      return res.status(409).json({ message: "You are already registered as a donor." });
    }

    const donor = new Donor({
      name,
      phone,
      bloodGroup,
      district,
      age,
      lastDonated,
      user: req.user.id,
    });

    await donor.save();
    return res.status(201).json(donor);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getDonors = async (req, res) => {
  try {
    const { bloodGroup, district, available } = req.query;

    const filter = {};
    if (bloodGroup && bloodGroup !== "Any blood group") filter.bloodGroup = bloodGroup;
    if (district   && district   !== "Any district")    filter.district   = district;
    if (available  !== undefined)                       filter.available  = available === "true";

    const donors = await Donor.find(filter).select("-user -__v");
    return res.status(200).json(donors);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBloodGroupCounts = async (req, res) => {
  try {
    const groups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

    const counts = await Promise.all(
      groups.map(async (group) => ({
        type: group,
        count: await Donor.countDocuments({ bloodGroup: group }),
      }))
    );

    return res.status(200).json(counts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMyDonorProfile = async (req, res) => {
  try {
    const donor = await Donor.findOne({ user: req.user.id });
    return res.status(200).json(donor);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateAvailability = async (req, res) => {
  try {
    const donor = await Donor.findOneAndUpdate(
      { user: req.user.id },
      { available: req.body.available },
      { new: true }
    );
    res.json(donor);
  } catch (err) {
    res.status(500).json({ errorMessage: err.message });
  }
};