import { useState } from "react";
import PageTitle from "../../../components/PageTitle.jsx";
import DataTable from "../../../components/DataTable.jsx";
import StatusBadge from "../../../components/StatusBadge.jsx";
import DeleteConfirmationModal from "../../adminLogin/popups/DeleteConfirmationModal.jsx";
import AddBusModal from "../../adminLogin/popups/AddBusModal.jsx";

export default function Buses() {
  const buses = [
    [
      "TS 09 AB 1234",
      "Greenwood International",
      "Rajesh Kumar",
      "40",
      "On Route",
      "2 min ago",
    ],
    [
      "DL 01 CD 5678",
      "Delhi Public School",
      "Suresh Yadav",
      "45",
      "On Route",
      "1 min ago",
    ],
    [
      "MH 14 GH 3456",
      "St. Mary's School",
      "Amit Singh",
      "35",
      "Delayed",
      "8 min ago",
    ],
    [
      "KA 01 EF 9012",
      "Ryan International",
      "Vikram Das",
      "50",
      "At School",
      "Just now",
    ],
    [
      "AP 16 TU 7890",
      "Narayana School",
      "Manoj Patel",
      "40",
      "On Route",
      "3 min ago",
    ],
    [
      "TN 04 AB 2245",
      "Oakridge International",
      "Deepak Verma",
      "42",
      "Offline",
      "25 min ago",
    ],
    [
      "KA 01 EF 9012",
      "Ryan International",
      "Vikram Das",
      "50",
      "At School",
      "Just now",
    ],
    [
      "AP 16 TU 7890",
      "Narayana School",
      "Manoj Patel",
      "40",
      "On Route",
      "3 min ago",
    ],
    [
      "TN 04 AB 2245",
      "Oakridge International",
      "Deepak Verma",
      "42",
      "Offline",
      "25 min ago",
    ],
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [schoolFilter, setSchoolFilter] = useState("All Schools");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddBusOpen, setIsAddBusOpen] = useState(false);

  const schools = [...new Set(buses.map((bus) => bus[1]))];
  const statuses = [...new Set(buses.map((bus) => bus[4]))];
  const search = searchTerm.toLowerCase();
  const filteredBuses = buses.filter(
    (bus) =>
      (schoolFilter === "All Schools" || bus[1] === schoolFilter) &&
      (statusFilter === "All Status" || bus[4] === statusFilter) &&
      bus.join(" ").toLowerCase().includes(search),
  );

  return (
    <>
      <PageTitle
        title="Buses"
        description="Manage the complete BusGuard fleet across all schools."
        button="+ Add Bus"
        onButtonClick={() => setIsAddBusOpen(true)}
      />
      <div className="filter-card admin-filter">
        <div style={{ display: "flex", gap: "1rem" }}>
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

          <div className="filter-group">
            <label>Filter by Status:</label>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option>All Status</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search buses..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      {/* <div className="stats-grid four">
        <StatCard
          title="Total Buses"
          value="1,426"
          icon={<i className="bi bi-bus-front"></i>}
          type="blue"
        />
        <StatCard
          title="On Route"
          value="892"
          icon={<i className="bi bi-geo"></i>}
          type="green"
        />
        <StatCard
          title="At School"
          value="312"
          icon={<i className="bi bi-building"></i>}
          type="purple"
        />
        <StatCard
          title="Offline"
          value="134"
          icon={<i className="bi bi-exclamation-triangle"></i>}
          type="red"
        />
      </div> */}
      <DataTable
        headers={[
          "Bus Number",
          "School",
          "Driver",
          "Capacity",
          "Status",
          "Last Update",
          "Actions",
        ]}
        rows={filteredBuses.map((b) => [
          <strong>{b[0]}</strong>,
          b[1],
          b[2],
          b[3],
          <StatusBadge status={b[4]} />,
          b[5],
          <div className="action-buttons">
            <button
              className="action-icon"
              title="edit"
              onClick={() => setIsAddBusOpen(true)}
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
        footer={`Showing ${filteredBuses.length} of ${buses.length} buses`}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        // onConfirm={handleDelete}
        title="Are you sure?"
        message="Are you sure you want to delete this item? This action cannot be undone."
      />
      <AddBusModal
        isOpen={isAddBusOpen}
        onClose={() => setIsAddBusOpen(false)}
        onSave={(bus) => {
          console.log("New Bus:", bus);
        }}
      />
    </>
  );
}
