import StatCard from "../../../components/StatCard.jsx";
import StatusBadge from "../../../components/StatusBadge.jsx";

export default function Dashboard({ onAddSchool, onViewSchools }) {
  const schools = [
    [
      "Greenwood International School",
      "Hyderabad",
      "Telangana",
      "1,240",
      "35",
      "Active",
    ],
    ["Delhi Public School", "New Delhi", "Delhi", "2,180", "48", "Active"],
    ["St. Mary's School", "Bengaluru", "Karnataka", "1,560", "32", "Active"],
    [
      "Ryan International School",
      "Mumbai",
      "Maharashtra",
      "2,320",
      "51",
      "Active",
    ],
    [
      "Narayana School",
      "Vijayawada",
      "Andhra Pradesh",
      "1,110",
      "25",
      "Active",
    ],
  ];

  const alerts = [
    [
      "Bus 03 delayed by 20 min",
      "St. Mary's School",
      "10:25 AM",
      "Delay",
      "Medium",
    ],
    [
      "SOS alert from Bus 12",
      "Greenwood International",
      "09:45 AM",
      "Emergency",
      "Critical",
    ],
    [
      "Student not mapped to Bus 08",
      "Delhi Public School",
      "09:30 AM",
      "Student",
      "High",
    ],
    ["Bus 21 completed trip", "Ryan International", "09:15 AM", "Info", "Low"],
    [
      "Bus 05 route deviation",
      "Narayana School",
      "09:10 AM",
      "Route",
      "Medium",
    ],
    [
      "Student didn't tap at school gate",
      "St. Mary's School",
      "08:50 AM",
      "Student",
      "Low",
    ],
  ];
  return (
    <>
      <div className="page-title">
        <div>
          <h2>Platform Overview</h2>

          <p>Monitor schools, fleet, students and safety across India.</p>
        </div>

        <button className="primary-button" onClick={onAddSchool}>
          + Add School
        </button>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Schools"
          value="248"
          footer="+12 this month"
          icon={<i class="bi bi-building"></i>}
          type="blue"
        />
        <StatCard
          title="Total Students"
          value="12,840"
          footer="+620 this month"
          icon={<i class="bi bi-people"></i>}
          type="green"
        />
        <StatCard
          title="Total Buses"
          value="1,426"
          footer="+38 this month"
          icon={<i class="bi bi-bus-front"></i>}
          type="purple"
        />
        <StatCard
          title="Active Alerts"
          value="86"
          footer="View all alerts"
          icon={<i class="bi bi-bell"></i>}
          type="red"
        />
      </div>

      <div className=" super-dashboard-grid">
        <div className="school-across-india">
          <div className="school-across-india-header">
            <p>Schools Across India</p>
            <button className="card-action" onClick={onViewSchools}>
              View All Schools
            </button>
          </div>
          <div className="dashboard-table">
            {/* Column Headers */}
            <div className="dashboard-row dashboard-header">
              <span>School</span>
              <span>Students</span>
              <span>Buses</span>
              <span>Status</span>
            </div>

            {/* School Data */}
            {schools.slice(0, 6).map((school) => (
              <div className="dashboard-row" key={school[0]}>
                <div className="school-mini">
                  <div className="school-logo">{school[0].charAt(0)}</div>

                  <div>
                    <strong>{school[0]}</strong>
                    <span>
                      {school[1]}, {school[2]}
                    </span>
                  </div>
                </div>

                <span>{school[3]}</span>
                <span>{school[4]}</span>

                <StatusBadge status={school[5]} />
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-map-card">
          <div className="live-fleet-overview-header">
            <p>Live Fleet Overview</p>
            <button className="card-action">View Full Map</button>
          </div>
          <div className="map">
            <div className="map-legend">
              <span>
                <i className="green-dot" /> On Route
              </span>
              <span>
                <i className="purple-dot" /> At School
              </span>
              <span>
                <i className="orange-dot" /> Delayed
              </span>
              <span>
                <i className="red-dot" /> Offline
              </span>
            </div>
          </div>
        </div>
        <div className="super-bottom-grid">
          <div className=" alerts-overview">
            <div className="alerts-overview-header">
              <p>Alerts Overview</p>
              <button className="card-action">View All</button>
            </div>
            <div className="compact-alert-list">
              {alerts.slice(0, 3).map((alert, index) => (
                <div className="alert-row">
                  <span className={`alert-icon ${alert[4].toLowerCase()}`}>
                    !
                  </span>
                  <div>
                    <strong>{alert[0]}</strong>
                    <span>
                      {alert[1]} • {alert[2]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="subscription-overview">
            <div className="subscription-overview-header">
              <p>Subscription Overview</p>
              <button className="card-action">View All</button>
            </div>
            <div className="subscription-chart">
              <div className="donut purple-donut">
                <div>
                  <strong>248</strong>
                  <span>Total Schools</span>
                </div>
              </div>
              <div className="subscription-legend">
                <div>
                  <span className="legend-dot green"></span>Active{" "}
                  <strong>210</strong>
                </div>
                <div>
                  <span className="legend-dot orange"></span>Expiring Soon{" "}
                  <strong>25</strong>
                </div>
                <div>
                  <span className="legend-dot red"></span>Expired{" "}
                  <strong>13</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
