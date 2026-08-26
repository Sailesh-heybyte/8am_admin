import React from "react";
import StatCard from "../../components/StatCard.jsx";
import CardHeader from "../../components/CardHeader.jsx";
import StatusBadge from "../../components/StatusBadge.jsx";
import IndiaMap from "../../components/IndiaMap.jsx";
import AlertRow from "../../components/AlertRow.jsx";

export default function Dashboard({ onAddSchool }) {
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
        <div className="card">
          <CardHeader title="Schools Across India" action="View All Schools" />

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

        <div className="card dashboard-map-card">
          <CardHeader title="Live Fleet Overview" action="View Full Map" />
          <IndiaMap />
        </div>
        <div className=" super-bottom-grid">
          <div className="card alerts-overview">
            <CardHeader title="Alerts Overview" action="View All" />
            <div className="compact-alert-list">
              {alerts.slice(0, 4).map((alert, index) => (
                <AlertRow key={index} alert={alert} />
              ))}
            </div>
          </div>

          <div className="card subscription-overview">
            <CardHeader title="Subscription Overview" action="View All" />
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
