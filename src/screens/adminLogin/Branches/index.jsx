import { useEffect, useMemo, useState } from "react";
import PageTitle from "../../../components/PageTitle.jsx";
import DataTable from "../../../components/DataTable.jsx";
import StatusBadge from "../../../components/StatusBadge.jsx";
import BranchModal from "../popups/BranchModal.jsx";
import { getSchools } from "../../../api/schools.js";
import {
  getBranches,
  createBranch,
  updateBranch,
} from "../../../api/branches.js";

export default function Branches() {
  const [schools, setSchools] = useState([]);
  const [schoolsLoading, setSchoolsLoading] = useState(true);

  // Branches are nested under a school, so nothing loads until one
  // is picked from the dropdown.
  const [selectedSchoolId, setSelectedSchoolId] = useState("");
  const [branches, setBranches] = useState([]);
  const [branchesLoading, setBranchesLoading] = useState(false);

  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [branchToEdit, setBranchToEdit] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Load the school list once, to fill the dropdown.
  useEffect(() => {
    getSchools()
      .then((data) => setSchools(data))
      .catch((err) => setError(err.message || "Failed to load schools."))
      .finally(() => setSchoolsLoading(false));
  }, []);

  // GET /tenancy/schools/{schoolId}/branches
  const loadBranches = async (schoolId) => {
    if (!schoolId) {
      setBranches([]);
      return;
    }

    setBranchesLoading(true);
    setError("");

    try {
      const data = await getBranches(schoolId);
      setBranches(data);
    } catch (err) {
      setError(err.message || "Failed to load branches.");
      setBranches([]);
    } finally {
      setBranchesLoading(false);
    }
  };

  const handleSchoolChange = (event) => {
    const schoolId = event.target.value;
    setSelectedSchoolId(schoolId);
    setQuery("");
    loadBranches(schoolId);
  };

  // Create is nested under the school, update is not. The backend
  // paths differ, so the two calls take different ids.
  const handleSaveBranch = async (branch, branchId) => {
    if (branchId) {
      await updateBranch(branchId, branch);
    } else {
      await createBranch(selectedSchoolId, branch);
    }
    await loadBranches(selectedSchoolId);
  };

  const openCreateForm = () => {
    setBranchToEdit(null);
    setIsFormOpen(true);
  };

  const selectedSchoolName =
    schools.find((school) => school.id === selectedSchoolId)?.schoolName ||
    "This school";

  const filteredBranches = useMemo(
    () =>
      branches.filter((branch) =>
        `${branch.branchName} ${branch.address}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [branches, query],
  );

  const renderTable = () => {
    // No school picked yet.
    if (!selectedSchoolId) {
      return (
        <div className="branch-empty-card">
          <i className="bi bi-geo-alt"></i>
          <h3>Choose a school first</h3>
          <p>
            Branches belong to a school. Pick one from the dropdown above to see
            and manage its branches.
          </p>
        </div>
      );
    }

    if (branchesLoading) {
      return (
        <div className="branch-empty-card">
          <p>Loading branches...</p>
        </div>
      );
    }

    // School picked, but it has no branches.
    if (branches.length === 0) {
      return (
        <div className="branch-empty-card">
          <i className="bi bi-geo-alt"></i>
          <h3>No branches yet</h3>
          <p>{selectedSchoolName} does not have any branches.</p>
          <button className="branch-empty-action" onClick={openCreateForm}>
            + Create the first branch
          </button>
        </div>
      );
    }

    return (
      <DataTable
        className="branches-table-card"
        headers={[
          "Branch",
          "Address",
          "Main Branch",
          "Status",
          "Created",
          "Actions",
        ]}
        rows={filteredBranches.map((branch) => [
          <strong key={`${branch.id}-name`}>{branch.branchName}</strong>,
          branch.address || "-",
          branch.isMainBranch ? (
            <span className="main-branch-tag">Main</span>
          ) : (
            "-"
          ),
          <StatusBadge status={branch.isActive ? "Active" : "Inactive"} />,
          branch.createdAt,
          <div className="action-buttons">
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
    );
  };

  return (
    <>
      <PageTitle
        title="Branches"
        description="Manage school branches and their operational details."
        button="+ Create Branch"
        onButtonClick={openCreateForm}
        buttonDisabled={!selectedSchoolId}
      />

      <div className="filter-card admin-filter">
        <div style={{ display: "flex", gap: "1rem" }}>
          <div className="filter-group">
            <label>School:</label>
            <select value={selectedSchoolId} onChange={handleSchoolChange}>
              <option value="">
                {schoolsLoading ? "Loading schools..." : "Select a school"}
              </option>
              {schools.map((school) => (
                <option key={school.id} value={school.id}>
                  {school.schoolName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <input
          type="search"
          placeholder="Search branches..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          disabled={!selectedSchoolId}
        />
      </div>

      {error && <p className="branch-error">{error}</p>}

      {renderTable()}

      <BranchModal
        key={branchToEdit?.id || "new-branch"}
        isOpen={isFormOpen}
        branch={branchToEdit}
        schoolName={selectedSchoolName}
        onClose={() => setIsFormOpen(false)}
        onSave={async (branch) => {
          await handleSaveBranch(branch, branchToEdit?.id);
          setIsFormOpen(false);
        }}
      />
    </>
  );
}
