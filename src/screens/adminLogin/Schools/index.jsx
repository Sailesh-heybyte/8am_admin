import { useState, useMemo } from "react";

import PageTitle from "../../../components/PageTitle.jsx";
import DataTable from "../../../components/DataTable.jsx";
import StatusBadge from "../../../components/StatusBadge.jsx";
import DeleteConfirmationModal from "../popups/DeleteConfirmationModal.jsx";

export default function Schools({ onAddSchool }) {
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
    [
      "Oakridge International School",
      "Chennai",
      "Tamil Nadu",
      "1,340",
      "28",
      "Active",
    ],
    [
      "Doon International School",
      "Dehradun",
      "Uttarakhand",
      "1,020",
      "22",
      "Inactive",
    ],
    [
      "Doon International School",
      "Dehradun",
      "Uttarakhand",
      "1,020",
      "22",
      "Inactive",
    ],
  ];

  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("All States");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const filtered = useMemo(
    () =>
      schools.filter(
        (school) =>
          school.join(" ").toLowerCase().includes(query.toLowerCase()) &&
          (stateFilter === "All States" || school[2] === stateFilter) &&
          (statusFilter === "All Status" || school[5] === statusFilter),
      ),
    [query, stateFilter, statusFilter],
  );

  return (
    <>
      <PageTitle
        title="Schools"
        description="Manage all schools connected to the BusGuard platform."
        button="+ Add School"
        onButtonClick={onAddSchool}
      />
      <div className="filter-card ">
        <div style={{ display: "flex", gap: "1rem" }}>
          <div className="filter-group">
            <label>Filter by State:</label>
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
            >
              <option>All States</option>
              <option>Telangana</option>
              <option>Delhi</option>
              <option>Karnataka</option>
              <option>Maharashtra</option>
              <option>Tamil Nadu</option>
              <option>Uttarakhand</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Filter by Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search schools..."
          />
        </div>
      </div>

      <DataTable
        headers={[
          "School Name",
          "City",
          "State",
          "Students",
          "Buses",
          "Status",
          "Actions",
        ]}
        rows={filtered.map((s) => [
          <div className="school-mini">
            <div className="school-logo">{s[0].charAt(0)}</div>
            <strong>{s[0]}</strong>
          </div>,
          s[1],
          s[2],
          s[3],
          s[4],
          <StatusBadge status={s[5]} />,
          <div className="action-buttons">
            <button className="action-icon" title="Edit" onClick={onAddSchool}>
              <i className="bi bi-pencil"></i>
            </button>

            <button
              className="action-icon"
              title="Delete"
              onClick={() => setIsDeleteOpen(true)}
            >
              <i className="bi bi-trash3"></i>
            </button>
          </div>,
        ])}
        withoutFilter={false}
        footer={`Showing 1–${filtered.length} of 248 schools`}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedStudent(null);
        }}
        // onConfirm={handleDelete}
        title="Are you sure?"
        message="Are you sure you want to delete this student? This action cannot be undone."
      />
    </>
  );
}
