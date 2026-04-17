  import "./CitizenDashboard.css";
  import { useAuthContext } from "../contexts/AuthContext";
  import { useNavigate } from "react-router-dom";
  import { useEffect } from "react";
  import { useState } from "react";
  import { formatDistanceToNow } from "date-fns";
  import axiosInstance from "../utils/AxiosInstance";

  const mockComplaints = [
    {
      id: 1,
      title: "Broken street light near main road",
      area: "Sadar",
      date: "3 days ago",
      status: "in-progress",
    },
    {
      id: 2,
      title: "Water supply disruption for 2 days",
      area: "Sadar",
      date: "1 week ago",
      status: "pending",
    },
    {
      id: 3,
      title: "Illegal dumping near school",
      area: "Hossainpur",
      date: "2 weeks ago",
      status: "resolved",
    },
    {
      id: 4,
      title: "Pothole on Station Road",
      area: "Sadar",
      date: "1 month ago",
      status: "resolved",
    },
  ];

  const mockActivity = [
    {
      id: 1,
      text: "Your complaint about street light is now in progress",
      time: "2 hours ago",
      color: "blue",
    },
    {
      id: 2,
      text: "Pothole complaint was marked as resolved",
      time: "3 days ago",
      color: "cyan",
    },
    {
      id: 3,
      text: "You submitted a new complaint about water supply",
      time: "1 week ago",
      color: "yellow",
    },
    {
      id: 4,
      text: "You registered as a blood donor",
      time: "2 weeks ago",
      color: "cyan",
    },
  ];

  const statusLabel = {
    pending: "Pending",
    "in-progress": "In progress",
    resolved: "Resolved",
  };
  const statusClass = {
    pending: "pill-pending",
    "in-progress": "pill-progress",
    resolved: "pill-resolved",
  };

  function Dashboard() {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const [complaints, setComplaints] = useState([]);
    const [registered, setRegistered] = useState(false);
    const [nextEventDate, setNextEventDate] = useState(null);
    const [donor, setDonor] = useState(null);
    const [activity, setActivity] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get(`/complaint/list/${user._id}`);
          setComplaints(response.data);

          const response2 = await axiosInstance.get("/app/volunteers/check");
          setRegistered(response2.data.enrolled);
          setNextEventDate(response2.data.nextEventDate);

          const response3 = await axiosInstance.get("/donors/me");
          setDonor(response3.data);

          const response4 = await axiosInstance.get("/activity/list");
          setActivity(response4.data);
        } catch (error) {
          console.log("Error updating data", error);
        }
      };
      fetchData();
    }, [user]);

    const pendingCount = complaints.filter((c) => c.status === "pending").length;

    return (
      <div className="dashPage">
        <div className="dashContainer">
          <div className="dashWelcome">
            <div className="dashWelcomeInner">
              <div className="dashWelcomeSub">Welcome back,</div>
              <h2 className="dashWelcomeName">
                <span className="dashWelcomeAccent">
                  {user?.name ?? "Citizen"}
                </span>
              </h2>
              <p className="dashWelcomeDesc">
                Track your complaints, registrations and activity all in one
                place.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="dashStats">
            <div className="dashStat">
              <div className="dashStatLabel">Complaints</div>
              <div className="dashStatVal">{complaints.length}</div>
              <div className="dashStatSub">{pendingCount} pending</div>
            </div>
            <div className="dashStat">
              <div className="dashStatLabel">Volunteer</div>
              <div className="dashStatBadge badge-cyan">
                {registered ? "Registered" : "Not registered"}
              </div>
              <div className="dashStatSub">
                {nextEventDate
                  ? `Upcoming event: ${new Date(nextEventDate).toLocaleDateString()}`
                  : "No upcoming events"}
              </div>
            </div>
            <div className="dashStat">
              <div className="dashStatLabel">Blood donor</div>
              <div className="dashStatBadge badge-cyan">
                {donor?.bloodGroup ?? "Not set"}
              </div>
              <div className="dashStatSub">{donor?.district ?? "Not set"} district</div>
            </div>
          </div>

          {/* Complaints */}
          <div className="dashSection">
            <div className="dashSectionTitle">Your complaints</div>
            {complaints.map((c) => (
              <div className="complaintCard" key={c._id}>
                <div>
                  <div className="complaintTitle">{c.title}</div>
                  <div className="complaintMeta">
                    Submitted {new Date(c.date).toLocaleDateString()} ·{" "}
                    {c.location.address}
                  </div>
                </div>
                <span className={`statusPill ${statusClass[c.status]}`}>
                  {statusLabel[c.status]}
                </span>
              </div>
            ))}
          </div>

          

          {/* Activity */}
          <div className="dashSection">
            <div className="dashSectionTitle">Recent activity</div>
            {activity.map((a) => (
              <div className="activityItem" key={a.id}>
                <div className={`activityDot`}></div>
                <div>
                  <div className="activityText">{a.message}</div>
                  <div className="activityTime">{formatDistanceToNow(new Date(a.createdAt), { addSuffix: true })}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            className="newComplaintBtn"
            onClick={() => navigate("/ReportPage")}
          >
            Submit a new complaint
          </button>
        </div>
      </div>
    );
  }

  export default Dashboard;
