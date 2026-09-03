import { useMemo, useState } from "react";
import PageTitle from "../../../components/PageTitle.jsx";
import DataTable from "../../../components/DataTable.jsx";
import StatusBadge from "../../../components/StatusBadge.jsx";
import BranchModal from "../popups/BranchModal.jsx";
import BranchDetailsModal from "../popups/BranchDetailsModal.jsx";

const schoolNameFor = (schools, schoolId) =>
  schools.find((school) => school.id === Number(schoolId))?.schoolName ||
  "Unknown school";

export default function Branches({ branches, schools, onSaveBranch }) {
  const [query, setQuery] = useState("");
  const [schoolFilter, setSchoolFilter] = useState("All Schools");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branchToEdit, setBranchToEdit] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredBranches = useMemo(
    () =>
      branches.filter(
        (branch) =>
          `${branch.branchName} ${branch.branchCode} ${schoolNameFor(schools, branch.schoolId)} ${branch.city}`
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (schoolFilter === "All Schools" ||
            schoolNameFor(schools, branch.schoolId) === schoolFilter) &&
          (statusFilter === "All Status" || branch.status === statusFilter),
      ),
    [branches, query, schoolFilter, statusFilter, schools],
  );

  return (
    <>
      <PageTitle
        title="Branches"
        description="Manage school branches and their operational details."
        button="+ Create Branch"
        onButtonClick={() => {
          setBranchToEdit(null);
          setIsFormOpen(true);
        }}
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
                <option key={school.id}>{school.schoolName}</option>
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
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
        <input
          type="search"
          placeholder="Search branches..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <DataTable
        className="branches-table-card"
        headers={[
          "Branch",
          "School",
          "Location",
          "Students",
          "Buses",
          "Status",
          "Actions",
        ]}
        rows={filteredBranches.map((branch) => [
          <button
            className="table-link"
            onClick={() => setSelectedBranch(branch)}
          >
            {branch.branchName}
          </button>,
          schoolNameFor(schools, branch.schoolId),
          `${branch.city}, ${branch.state}`,
          branch.studentCount,
          branch.busCount,
          <StatusBadge status={branch.status} />,
          <div className="action-buttons">
            <button
              className="action-icon"
              title="View details"
              onClick={() => setSelectedBranch(branch)}
            >
              <i className="bi bi-eye"></i>
            </button>
            <button
              className="action-icon"
              title="Edit branch"
              onClick={() => {
                setBranchToEdit(branch);
                setIsFormOpen(true);
              }}
            >
              <i className="bi bi-pencil"></i>
            </button>
          </div>,
        ])}
        withoutFilter={false}
        footer={`Showing ${filteredBranches.length} of ${branches.length} branches`}
      />
      <BranchDetailsModal
        branch={selectedBranch}
        schoolName={
          selectedBranch ? schoolNameFor(schools, selectedBranch.schoolId) : ""
        }
        onClose={() => setSelectedBranch(null)}
        onEdit={() => {
          setBranchToEdit(selectedBranch);
          setSelectedBranch(null);
          setIsFormOpen(true);
        }}
      />
      <BranchModal
        key={branchToEdit?.id || "new-branch"}
        isOpen={isFormOpen}
        branch={branchToEdit}
        schools={schools}
        onClose={() => setIsFormOpen(false)}
        onSave={(branch) => {
          onSaveBranch(branch, branchToEdit?.id);
          setIsFormOpen(false);
        }}
      />
    </>
  );
}
