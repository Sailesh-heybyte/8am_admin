import { useState } from "react";

import PageTitle from "../../../components/PageTitle.jsx";
import DataTable from "../../../components/DataTable.jsx";

export default function AuditLogs() {
  const [selectedUser, setSelectedUser] = useState("All Users");
  const [selectedModule, setSelectedModule] = useState("All Modules");
  const [searchTerm, setSearchTerm] = useState("");

  const auditLogs = [
    [
      "admin@busguard.in",
      "Added School",
      "Schools",
      "Greenwood International",
      "103.21.45.12",
      "26 May 2026, 10:25 AM",
    ],
    [
      "admin@busguard.in",
      "Added Bus",
      "Buses",
      "TS 09 AB 1234",
      "103.21.45.12",
      "26 May 2026, 10:19 AM",
    ],
    [
      "support@busguard.in",
      "Updated Route",
      "Routes",
      "Route 04",
      "103.21.45.12",
      "26 May 2026, 10:04 AM",
    ],
    [
      "admin@busguard.in",
      "Resolved Alert",
      "Alerts",
      "Alert #BG-2451",
      "103.21.45.12",
      "25 May 2026, 04:30 PM",
    ],
    [
      "viewer@busguard.in",
      "Viewed Report",
      "Reports",
      "Trips Report",
      "103.21.45.12",
      "25 May 2026, 02:10 PM",
    ],
    [
      "admin@busguard.in",
      "Added School",
      "Schools",
      "Greenwood International",
      "103.21.45.12",
      "26 May 2026, 10:25 AM",
    ],
    [
      "admin@busguard.in",
      "Added Bus",
      "Buses",
      "TS 09 AB 1234",
      "103.21.45.12",
      "26 May 2026, 10:19 AM",
    ],
    [
      "support@busguard.in",
      "Updated Route",
      "Routes",
      "Route 04",
      "103.21.45.12",
      "26 May 2026, 10:04 AM",
    ],
    [
      "admin@busguard.in",
      "Resolved Alert",
      "Alerts",
      "Alert #BG-2451",
      "103.21.45.12",
      "25 May 2026, 04:30 PM",
    ],
    [
      "viewer@busguard.in",
      "Viewed Report",
      "Reports",
      "Trips Report",
      "103.21.45.12",
      "25 May 2026, 02:10 PM",
    ],
  ];

  const filteredLogs = auditLogs.filter((log) => {
    const userMatch = selectedUser === "All Users" || log[0] === selectedUser;

    const moduleMatch =
      selectedModule === "All Modules" || log[2] === selectedModule;

    const searchMatch =
      log[0].toLowerCase().includes(searchTerm.toLowerCase()) ||
      log[1].toLowerCase().includes(searchTerm.toLowerCase()) ||
      log[2].toLowerCase().includes(searchTerm.toLowerCase()) ||
      log[3].toLowerCase().includes(searchTerm.toLowerCase());

    return userMatch && moduleMatch && searchMatch;
  });

  return (
    <>
      <PageTitle
        title="Audit Logs"
        description="Track important actions performed across the platform."
      />

      <div className="filter-card admin-filter">
        <div style={{ display: "flex", gap: "1rem" }}>
          <div className="filter-group">
            <label>Filter by User:</label>

            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option>All Users</option>
              <option>admin@busguard.in</option>
              <option>support@busguard.in</option>
              <option>viewer@busguard.in</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Filter by Module:</label>

            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
            >
              <option>All Modules</option>
              <option>Schools</option>
              <option>Buses</option>
              <option>Routes</option>
              <option>Alerts</option>
              <option>Reports</option>
            </select>
          </div>
        </div>

        <input
          placeholder="Search user or action..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <DataTable
        headers={[
          "User",
          "Action",
          "Module",
          "Details",
          "IP Address",
          "Date & Time",
        ]}
        rows={filteredLogs.map((l) => [
          <strong key={`${l[0]}-${l[5]}`}>{l[0]}</strong>,
          l[1],
          l[2],
          l[3],
          l[4],
          l[5],
        ])}
        withoutFilter={false}
        footer={`Showing ${filteredLogs.length} activity record${
          filteredLogs.length !== 1 ? "s" : ""
        }`}
      />
    </>
  );
}
