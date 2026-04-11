import "./BloodDonation.css";
import { useState, useEffect } from "react";
import api from "../../utils/AxiosInstance";
import toast from "react-hot-toast";

const districts = [
  "Any district",
  "Dhaka", "Chittagong", "Khulna", "Rajshahi", "Sylhet",
  "Barisal", "Rangpur", "Mymensingh",
];

const bloodGroups = ["Any blood group", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const getInitials = (name) =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

const getTag = (count) => {
  if (count <= 5)  return "CRITICAL";
  if (count <= 20) return "LOW";
  if (count <= 50) return "STABLE";
  return "OPTIMAL";
};

function BloodDonation() {
  const [bloodCounts, setBloodCounts]       = useState([]);
  const [donors, setDonors]                 = useState([]);
  const [loadingCounts, setLoadingCounts]   = useState(true);
  const [loadingDonors, setLoadingDonors]   = useState(false);
  const [showForm, setShowForm]             = useState(false);
  const [searchBlood, setSearchBlood]       = useState("Any blood group");
  const [searchDistrict, setSearchDistrict] = useState("Any district");
  const [searched, setSearched]             = useState(false);
  const [revealedPhones, setRevealedPhones] = useState({});
  const [submitting, setSubmitting]         = useState(false);
  const [myProfile, setMyProfile]           = useState(null);
  const [availability, setAvailability]     = useState(true);

  const [form, setForm] = useState({
    name: "", phone: "", blood: "", district: "", age: "", lastDonated: "",
  });

  useEffect(() => {
    fetchCounts();
    fetchMyProfile();
  }, []);

  const fetchCounts = async () => {
    try {
      const { data } = await api.get("/donors/counts");
      setBloodCounts(data);
    } catch (err) {
      toast.error("Failed to load blood supply data.");
    } finally {
      setLoadingCounts(false);
    }
  };

  const fetchMyProfile = async () => {
    try {
      const { data } = await api.get("/donors/me");
      setMyProfile(data);
      setAvailability(data.available ?? true);
    } catch (err) {
      // not registered yet, that's fine
      setMyProfile(null);
    }
  };

  const handleSearch = async () => {
    setLoadingDonors(true);
    setSearched(true);
    try {
      const params = {};
      if (searchBlood    !== "Any blood group") params.bloodGroup = searchBlood;
      if (searchDistrict !== "Any district")    params.district   = searchDistrict;
      const { data } = await api.get("/donors", { params });
      setDonors(data);
    } catch (err) {
      toast.error("Failed to search donors.");
    } finally {
      setLoadingDonors(false);
    }
  };

  const togglePhone = (id) =>
    setRevealedPhones((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleFormChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.blood || !form.district || !form.age) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (Number(form.age) < 18 || Number(form.age) > 65) {
      toast.error("Age must be between 18 and 65.");
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/donors", {
        name:        form.name,
        phone:       form.phone,
        bloodGroup:  form.blood,
        district:    form.district,
        age:         Number(form.age),
        lastDonated: form.lastDonated || null,
      });
      toast.success("You are now registered as a donor!");
      setShowForm(false);
      setForm({ name: "", phone: "", blood: "", district: "", age: "", lastDonated: "" });
      fetchCounts();
      fetchMyProfile();
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleAvailability = async () => {
  try {
    const newStatus = !availability;
    await api.patch("/donors/me/availability", { available: newStatus });
    setAvailability(newStatus);
    toast.success(newStatus ? "You are now available" : "You are now unavailable");
  } catch (err) {
    toast.error("Failed to update availability.");
  }
};

  return (
    <div className="bloodDonationPage">
      <div className="container">

        <div className="heroSection">
          <div className="heroText">
            <h1 className="heroTitle">
              Give blood, <span className="heroAccent">save a life</span>
            </h1>
            <p className="heroDescription">
              Find a donor near you or register yourself to help
              citizens in emergencies across Bangladesh.
            </p>
            <div className="heroButtons">
              {myProfile ? (
                <div className="donorStatusRow">
                  <span className="registeredBadge">✓ Registered as donor</span>
                  <button className={`availabilityBtn ${availability ? "unavailable" : "available"}`} onClick={toggleAvailability}>
                    {availability ? "✗ Unavailable" : "✓ Available"}
                  </button>
                </div>
              ) : (
                <button className="donateBtn" onClick={() => setShowForm(true)}>
                  Register as donor
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="bloodStatusSection">
          <h2 className="statusTitle">Real-time blood supply status</h2>
          {loadingCounts ? (
            <p style={{ textAlign: "center", color: "#e0b4b4" }}>Loading...</p>
          ) : (
            <div className="statusCards">
              {bloodCounts.map((blood) => {
                const tag = getTag(blood.count);
                return (
                  <div className="statusCard" key={blood.type}>
                    <h3>{blood.type}</h3>
                    <p className="statusCount">{blood.count} donors</p>
                    <span className={`statusTag tag-${tag.toLowerCase()}`}>
                      {tag}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="searchSection">
          <h2 className="searchTitle">Find a donor</h2>
          <p className="searchSub">
            Search by blood group and district to find available donors near you
          </p>
          <div className="searchRow">
            <div className="formGroup">
              <label>Blood group</label>
              <select value={searchBlood} onChange={(e) => setSearchBlood(e.target.value)}>
                {bloodGroups.map((g) => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div className="formGroup">
              <label>District</label>
              <select value={searchDistrict} onChange={(e) => setSearchDistrict(e.target.value)}>
                {districts.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <button className="searchBtn" onClick={handleSearch} disabled={loadingDonors}>
              {loadingDonors ? "Searching..." : "Search"}
            </button>
          </div>

          {searched && (
            <div className="donorResults">
              {loadingDonors ? (
                <p style={{ color: "#e0b4b4", fontSize: "14px" }}>Searching...</p>
              ) : (
                <>
                  <p className="resultsCount">
                    {donors.length} donor{donors.length !== 1 ? "s" : ""} found
                  </p>
                  {donors.length === 0 ? (
                    <div className="noResults">No donors found for this search.</div>
                  ) : (
                    donors.map((donor) => (
                      <div className="donorCard" key={donor._id}>
                        <div className="donorLeft">
                          <div className="donorAvatar">{getInitials(donor.name)}</div>
                          <div>
                            <div className="donorName">{donor.name}</div>
                            <div className="donorMeta">
                              {donor.district} · age {donor.age}
                              {donor.lastDonated && ` · last donated ${new Date(donor.lastDonated).toLocaleDateString()}`}
                            </div>
                          </div>
                        </div>
                        <div className="donorRight">
                          <span className="bloodBadge">{donor.bloodGroup}</span>
                          <button className="phoneBtn" onClick={() => togglePhone(donor._id)}>
                            {revealedPhones[donor._id] ? donor.phone : "Show number"}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </>
              )}
            </div>
          )}
        </div>

        <div className="eligibilitySection">
          <div className="eligibilityCardMain">
            <h2>Am I eligible?</h2>
            <p className="eligibilityIntro">
              Most people can give blood if they are in good health. Check our basic requirements:
            </p>
            {[
              { title: "Age requirement",  desc: "Between 17 and 65 years old." },
              { title: "Weight limit",     desc: "Weigh at least 50kg (110 lbs)." },
              { title: "Health condition", desc: "Feeling well and healthy on the day of donation." },
              { title: "Identification",   desc: "Valid government-issued photo ID required." },
            ].map((item) => (
              <div className="eligibilityItem" key={item.title}>
                <span className="checkIcon">✓</span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {showForm && (
        <div className="popupOverlay">
          <div className="popupCard">
            <h2>Register as a donor</h2>
            <p className="popupSub">Your details will only be visible to logged-in users</p>

            <div className="popupRow">
              <div className="formGroup">
                <label>Full name</label>
                <input name="name" type="text" placeholder="Your full name" onChange={handleFormChange}/>
              </div>
              <div className="formGroup">
                <label>Phone number</label>
                <input name="phone" type="text" placeholder="+880 ..." onChange={handleFormChange}/>
              </div>
            </div>

            <div className="popupRow">
              <div className="formGroup">
                <label>Blood group</label>
                <select name="blood" onChange={handleFormChange}>
                  <option value="">Select blood group</option>
                  {["A+","A-","B+","B-","O+","O-","AB+","AB-"].map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div className="formGroup">
                <label>District</label>
                <select name="district" onChange={handleFormChange}>
                  <option value="">Select district</option>
                  {districts.slice(1).map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <div className="popupRow">
              <div className="formGroup">
                <label>Age</label>
                <input name="age" type="number" placeholder="18–65" onChange={handleFormChange}/>
              </div>
              <div className="formGroup">
                <label>Last donation date</label>
                <input name="lastDonated" type="date" onChange={handleFormChange}/>
              </div>
            </div>

            <div className="formButtons">
              <button className="cancelBtn" onClick={() => setShowForm(false)} disabled={submitting}>
                Cancel
              </button>
              <button className="submitBtn" onClick={handleSubmit} disabled={submitting}>
                {submitting ? "Registering..." : "Register"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BloodDonation;