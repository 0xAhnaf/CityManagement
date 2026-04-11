import React, { useEffect, useState } from "react";
import "./HomeDashboard.css";
import ProgressBar from "../ProgressBar/ProgressBar";
import api from "../utils/AxiosInstance";

function HomeDashboard() {
  const [issues, setIssues] = useState(0);
  const [solved, setSolved] = useState(0);
  const [donors, setDonors] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [complaintsRes, donorsRes] = await Promise.allSettled([
          api.get("/complaint/stats"),
          api.get("/donors"),
        ]);
        if (complaintsRes.status === "fulfilled") {
          setIssues(complaintsRes.value.data.total);
          setSolved(complaintsRes.value.data.resolved);
        }
        if (donorsRes.status === "fulfilled") {
          setDonors(donorsRes.value.data.length);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchStats();
  }, []);

  const per = issues > 0 ? Math.round((solved / issues) * 100) : 0;

  return (
    <div className="Container-1">
      <div className="title">
        <div>
          <h3>Community Impact Dashboard</h3>
        </div>
        <p>Transparency in action. See how we are working together to improve our city</p>
      </div>

      <div className="Data">
        <div className="reported Data-box">
          <p className="number">{issues}</p>
          <p>ISSUES REPORTED</p>
          <p className="Year">Fiscal Year 2026</p>
        </div>

        <div className="solved Data-box">
          <p className="number">{solved}</p>
          <p>ISSUES RESOLVED</p>
          <div className="progress">
            <ProgressBar value={per} color="green" />
          </div>
          <p className="rate">{per}% Success Rate</p>
        </div>

        <div className="volunteers Data-box">
          <p className="number">{donors}</p>
          <p>REGISTERED DONORS</p>
          <p className="growth">Helping save lives</p>
        </div>
      </div>

      <div className="Speed">
        <div className="Resolution-Speed">
          <h3>Resolution Speed Trends</h3>

          <div className="Info">
            <p>Pothole Repair</p>
            <p>{4.7} Days Avg</p>
          </div>
          <ProgressBar value={60} color="blue" />

          <div className="Info">
            <p>Street Light Fix</p>
            <p>{3.2} Days Avg</p>
          </div>
          <ProgressBar value={80} color="blue" />

          <div className="Info">
            <p>Graffiti Removal</p>
            <p>{5.1} Days Avg</p>
          </div>
          <ProgressBar value={50} color="blue" />
        </div>

        <div className="More-data">
          <h3>Driven by Citizen Data</h3>
          <p>We do our work based on the dashboard that is controlled by citizens. Every report you file helps our maintenance crews prioritize work where it's needed most.</p>
        </div>
      </div>
    </div>
  );
}

export default HomeDashboard;