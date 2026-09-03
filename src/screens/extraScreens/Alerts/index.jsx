import { useState } from "react";
import PageTitle from "../../../components/PageTitle.jsx";
import FullAlert from "../../../components/FullAlert.jsx";

export default function Alerts() {
  const [activeFilter, setActiveFilter] = useState("All Alerts");

  const alerts = [
    {
      title: "Bus 03 delayed by 20 min",
      school: "St. Mary's School",
      time: "10:25 AM",
      type: "Delay",
      priority: "Medium",
    },
    {
      title: "SOS alert from Bus 12",
      school: "Greenwood International",
      time: "09:45 AM",
      type: "Emergency",
      priority: "Critical",
    },
    {
      title: "Student not mapped to Bus 08",
      school: "Delhi Public School",
      time: "09:30 AM",
      type: "Student",
      priority: "High",
    },
    {
      title: "Bus 21 completed trip",
      school: "Ryan International",
      time: "09:15 AM",
      type: "Info",
      priority: "Low",
    },
    {
      title: "Bus 05 route deviation",
      school: "Narayana School",
      time: "09:10 AM",
      type: "Route",
      priority: "Medium",
    },
    {
      title: "Student didn't tap at school gate",
      school: "St. Mary's School",
      time: "08:50 AM",
      type: "Student",
      priority: "Low",
    },
  ];

  const filteredAlerts = alerts.filter((alert) => {
    if (activeFilter === "All Alerts") return true;

    if (activeFilter === "Critical") {
      return alert.priority === "Critical";
    }

    if (activeFilter === "Warnings") {
      return ["High", "Medium"].includes(alert.priority);
    }

    if (activeFilter === "Info") {
      return alert.type === "Info" || alert.priority === "Low";
    }

    return true;
  });

  return (
    <>
      <PageTitle
        title="Alerts"
        description="Review platform-wide safety, route and student alerts."
      />

      <div className="alert-filter">
        <button
          className={activeFilter === "All Alerts" ? "active-filter" : ""}
          onClick={() => setActiveFilter("All Alerts")}
        >
          All Alerts <b>{alerts.length}</b>
        </button>

        <button
          className={activeFilter === "Critical" ? "active-filter" : ""}
          onClick={() => setActiveFilter("Critical")}
        >
          Critical{" "}
          <b>
            {alerts.filter((alert) => alert.priority === "Critical").length}
          </b>
        </button>

        <button
          className={activeFilter === "Warnings" ? "active-filter" : ""}
          onClick={() => setActiveFilter("Warnings")}
        >
          Warnings{" "}
          <b>
            {
              alerts.filter((alert) =>
                ["High", "Medium"].includes(alert.priority),
              ).length
            }
          </b>
        </button>

        <button
          className={activeFilter === "Info" ? "active-filter" : ""}
          onClick={() => setActiveFilter("Info")}
        >
          Info{" "}
          <b>
            {
              alerts.filter(
                (alert) => alert.type === "Info" || alert.priority === "Low",
              ).length
            }
          </b>
        </button>

        <button className="mark-read">Mark all as read</button>
      </div>

      <div className="card alerts-page">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert, index) => (
            <FullAlert
              key={index}
              alert={[
                alert.title,
                alert.school,
                alert.time,
                alert.type,
                alert.priority,
              ]}
            />
          ))
        ) : (
          <p>No alerts found.</p>
        )}
      </div>
    </>
  );
}
