import { useState } from "react";

import PageTitle from "../../../components/PageTitle.jsx";
import DataTable from "../../../components/DataTable.jsx";
import StatusBadge from "../../../components/StatusBadge.jsx";
import DeleteConfirmationModal from "../popups/DeleteConfirmationModal.jsx";
import AddDriverModal from "../popups/AddDriverModal.jsx";

export default function Drivers() {
  const drivers = [
    [
      "Rajesh Kumar",
      "DRV001",
      "TS 09 AB 1234",
      "Greenwood International",
      "Active",
    ],
    [
      "Suresh Yadav",
      "DRV002",
      "DL 01 CD 5678",
      "Delhi Public School",
      "Active",
    ],
    ["Amit Singh", "DRV003", "MH 14 GH 3456", "St. Mary's School", "On Leave"],
    ["Vikram Das", "DRV004", "KA 01 EF 9012", "Ryan International", "Active"],
    ["Manoj Patel", "DRV005", "AP 16 TU 7890", "Narayana School", "Active"],
    [
      "Deepak Verma",
      "DRV006",
      "TN 04 AB 2245",
      "Oakridge International",
      "Inactive",
    ],
    [
      "Rajesh Kumar",
      "DRV001",
      "TS 09 AB 1234",
      "Greenwood International",
      "Active",
    ],
    [
      "Suresh Yadav",
      "DRV002",
      "DL 01 CD 5678",
      "Delhi Public School",
      "Active",
    ],
  ];
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddDriverOpen, setIsAddDriverOpen] = useState(false);
  return (
    <>
      <PageTitle
        title="Drivers"
        description="Manage drivers, assignments and account status."
        button="+ Add Driver"
        onButtonClick={() => setIsAddDriverOpen(true)}
      />
      <div className="filter-card admin-filter">
        <div style={{ display: "flex", gap: "1rem" }}>
          <div className="filter-group">
            <label>Filter by Status:</label>
            <select>
              <option>All Status</option>
              <option>Active</option>
              <option>On Leave</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Filter by School:</label>
            <select>
              <option>All Schools</option>
              <option>Greenwood International</option>
              <option>Delhi Public School</option>
            </select>
          </div>
        </div>

        <input placeholder="Search drivers..." />
      </div>
      <DataTable
        headers={["Driver", "ID", "Bus", "School", "Status", "Actions"]}
        rows={drivers.map((d) => [
          <div className="student-cell">
            <div className="student-avatar">{d[0].charAt(0)}</div>
            <strong>{d[0]}</strong>
          </div>,
          d[1],
          d[2],
          d[3],
          <StatusBadge status={d[4]} />,
          <div className="action-buttons">
            <button
              className="action-icon"
              title="edit"
              onClick={() => setIsAddDriverOpen(true)}
            >
              <i class="bi bi-pencil"></i>
            </button>
            <button
              className="action-icon"
              title="Delete"
              onClick={() => setIsDeleteOpen(true)}
            >
              <i class="bi bi-trash3"></i>
            </button>
          </div>,
        ])}
        withoutFilter={false}
        footer="Showing 1–6 of 602 drivers"
      />
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        // onConfirm={handleDelete}
        title="Are you sure?"
        message="Are you sure you want to delete this item? This action cannot be undone."
      />
      <AddDriverModal
        isOpen={isAddDriverOpen}
        onClose={() => setIsAddDriverOpen(false)}
        onSave={(driver) => {
          console.log("New Driver:", driver);
        }}
      />
    </>
  );
}
