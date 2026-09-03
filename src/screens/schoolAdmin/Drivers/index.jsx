import { useState } from "react";

import PageTitle from "../../../components/PageTitle.jsx";
import DataTable from "../../../components/DataTable.jsx";
import StatusBadge from "../../../components/StatusBadge.jsx";
import DeleteConfirmationModal from "../../adminLogin/popups/DeleteConfirmationModal.jsx";
import AddDriverModal from "../../adminLogin/popups/AddDriverModal.jsx";

export default function Drivers() {
  const drivers = [
    {
      name: "Rajesh Kumar",
      id: "DRV001",
      bus: "TS 09 AB 1234",
      school: "Greenwood International",
      status: "Active",
    },
    {
      name: "Suresh Yadav",
      id: "DRV002",
      bus: "DL 01 CD 5678",
      school: "Delhi Public School",
      status: "Active",
    },
    {
      name: "Amit Singh",
      id: "DRV003",
      bus: "MH 14 GH 3456",
      school: "St. Mary's School",
      status: "On Leave",
    },
    {
      name: "Vikram Das",
      id: "DRV004",
      bus: "KA 01 EF 9012",
      school: "Ryan International",
      status: "Active",
    },
    {
      name: "Manoj Patel",
      id: "DRV005",
      bus: "AP 16 TU 7890",
      school: "Narayana School",
      status: "Active",
    },
    {
      name: "Deepak Verma",
      id: "DRV006",
      bus: "TN 04 AB 2245",
      school: "Oakridge International",
      status: "Inactive",
    },
    {
      name: "Rajesh Kumar",
      id: "DRV007",
      bus: "TS 09 AB 5678",
      school: "Greenwood International",
      status: "Active",
    },
    {
      name: "Suresh Yadav",
      id: "DRV008",
      bus: "DL 01 CD 7890",
      school: "Delhi Public School",
      status: "Active",
    },
  ];

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddDriverOpen, setIsAddDriverOpen] = useState(false);

  const [statusFilter, setStatusFilter] = useState("All Status");
  const [schoolFilter, setSchoolFilter] = useState("All Schools");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDrivers = drivers.filter((driver) => {
    const matchesStatus =
      statusFilter === "All Status" || driver.status === statusFilter;

    const matchesSchool =
      schoolFilter === "All Schools" || driver.school === schoolFilter;

    const search = searchTerm.toLowerCase();

    const matchesSearch =
      driver.name.toLowerCase().includes(search) ||
      driver.id.toLowerCase().includes(search) ||
      driver.bus.toLowerCase().includes(search) ||
      driver.school.toLowerCase().includes(search);

    return matchesStatus && matchesSchool && matchesSearch;
  });

  const schools = [...new Set(drivers.map((driver) => driver.school))];

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
          {/* Status Filter */}
          <div className="filter-group">
            <label>Filter by Status:</label>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option>All Status</option>
              <option>Active</option>
              <option>On Leave</option>
              <option>Inactive</option>
            </select>
          </div>

          {/* School Filter */}
          <div className="filter-group">
            <label>Filter by School:</label>

            <select
              value={schoolFilter}
              onChange={(event) => setSchoolFilter(event.target.value)}
            >
              <option>All Schools</option>

              {schools.map((school) => (
                <option key={school} value={school}>
                  {school}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search drivers..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <DataTable
        headers={["Driver", "ID", "Bus", "School", "Status", "Actions"]}
        rows={filteredDrivers.map((driver) => [
          <div className="student-cell" key={driver.id}>
            <div className="student-avatar">{driver.name.charAt(0)}</div>

            <strong>{driver.name}</strong>
          </div>,

          driver.id,

          driver.bus,

          driver.school,

          <StatusBadge status={driver.status} />,

          <div className="action-buttons">
            <button
              className="action-icon"
              title="Edit"
              onClick={() => setIsAddDriverOpen(true)}
            >
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
        footer={`Showing ${filteredDrivers.length} of ${drivers.length} drivers`}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Are you sure?"
        message="Are you sure you want to delete this item? This action cannot be undone."
      />

      <AddDriverModal
        isOpen={isAddDriverOpen}
        onClose={() => setIsAddDriverOpen(false)}
        onSave={(driver) => {
          console.log("New Driver:", driver);
          setIsAddDriverOpen(false);
        }}
      />
    </>
  );
}
