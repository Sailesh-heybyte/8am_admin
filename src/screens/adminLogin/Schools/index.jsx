import { useMemo, useState, useEffect } from "react";
import PageTitle from "../../../components/PageTitle.jsx";
import DataTable from "../../../components/DataTable.jsx";
import StatusBadge from "../../../components/StatusBadge.jsx";
import DeleteConfirmationModal from "../popups/DeleteConfirmationModal.jsx";
import AddSchoolModal from "../popups/AddSchoolModal.jsx";
import SchoolDetails from "./SchoolDetails.jsx";
import AccessRestricted, {
  isPermissionDenied,
} from "../../../components/AccessRestricted.jsx";
import {
  getSchools,
  createSchool,
  updateSchool,
  suspendSchool,
  reactivateSchool,
} from "../../../api/schools.js";

export default function Schools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [schoolToChange, setSchoolToChange] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [schoolToEdit, setSchoolToEdit] = useState(null);

  const loadSchools = async () => {
    try {
      const data = await getSchools();
      setSchools(data);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to load schools.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSchools();
  }, []);

  const handleSaveSchool = async (schoolData, schoolId) => {
    if (schoolId) {
      await updateSchool(schoolId, schoolData);
    } else {
      await createSchool(schoolData);
    }
    await loadSchools();
  };

  const handleUpdateStatus = async (schoolId, currentStatus) => {
    if (currentStatus === "Active") {
      await suspendSchool(schoolId);
    } else {
      await reactivateSchool(schoolId);
    }
    await loadSchools();
  };

  const filtered = useMemo(
    () =>
      schools.filter(
        (school) =>
          Object.values(school)
            .join(" ")
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (statusFilter === "All Status" || school.status === statusFilter),
      ),
    [query, statusFilter, schools],
  );

  if (isPermissionDenied(error)) {
    return (
      <>
        <PageTitle
          title="Schools"
          description="Manage all schools connected to the 8AM platform."
        />
        <AccessRestricted resource="schools" onRetry={loadSchools} />
      </>
    );
  }

  if (selectedSchool) {
    return (
      <>
        <SchoolDetails
          school={selectedSchool}
          onBack={() => setSelectedSchool(null)}
          onEdit={() => {
            setSchoolToEdit(selectedSchool);
            setIsFormOpen(true);
          }}
          onStatusChange={() => setSchoolToChange(selectedSchool)}
        />
        <DeleteConfirmationModal
          isOpen={Boolean(schoolToChange)}
          onClose={() => setSchoolToChange(null)}
          onConfirm={async () => {
            await handleUpdateStatus(
              schoolToChange.id,
              schoolToChange.status,
            );
            setSelectedSchool((prev) =>
              prev && prev.id === schoolToChange.id
                ? {
                    ...prev,
                    status:
                      schoolToChange.status === "Active"
                        ? "Suspended"
                        : "Active",
                  }
                : prev,
            );
            setSchoolToChange(null);
          }}
          title={
            schoolToChange?.status === "Active"
              ? "Suspend school?"
              : "Reactivate school?"
          }
          message={
            schoolToChange?.status === "Active"
              ? "This will prevent the school from using the platform until reactivated."
              : "This will restore the school's platform access."
          }
          confirmLabel={
            schoolToChange?.status === "Active"
              ? "Suspend School"
              : "Reactivate School"
          }
        />
        <AddSchoolModal
          key={schoolToEdit?.id || "new-school"}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          initialData={schoolToEdit}
          title="Update School"
          onSave={async (schoolData) => {
            await handleSaveSchool(schoolData, schoolToEdit?.id);
            setSelectedSchool((prev) =>
              prev ? { ...prev, ...schoolData } : prev,
            );
            setIsFormOpen(false);
          }}
        />
      </>
    );
  }

  return (
    <>
      <PageTitle
        title="Schools"
        description="Manage all schools connected to the BusGuard platform."
        button="+ Add School"
        onButtonClick={() => {
          setSchoolToEdit(null);
          setIsFormOpen(true);
        }}
      />
      <div className="filter-card ">
        <div style={{ display: "flex", gap: "1rem" }}>
          <div className="filter-group">
            <label>Filter by Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Suspended</option>
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

      {loading ? (
        <div style={{ padding: "1.5rem", color: "#666", fontSize: "0.85rem" }}>
          Loading schools...
        </div>
      ) : error ? (
        <div
          style={{ padding: "1.5rem", color: "#d9534f", fontSize: "0.85rem" }}
        >
          {error}
        </div>
      ) : (
        <DataTable
          headers={["School Name", "School Slug", "Status", "Actions"]}
          className="schools-table-card"
          onRowClick={(index) => setSelectedSchool(filtered[index])}
          rows={filtered.map((school) => [
            <button
              className="table-link school-name-link"
              onClick={() => setSelectedSchool(school)}
            >
              <div className="school-mini">
                <div className="school-logo">
                  {school.schoolName?.charAt(0)}
                </div>
                <strong>{school.schoolName}</strong>
              </div>
            </button>,
            school.schoolCode,
            <StatusBadge status={school.status} />,
            <div className="action-buttons">
              <button
                className="action-icon"
                title="View details"
                onClick={() => setSelectedSchool(school)}
              >
                <i className="bi bi-eye"></i>
              </button>
              <button
                className="action-icon"
                title="Edit"
                onClick={() => {
                  setSchoolToEdit(school);
                  setIsFormOpen(true);
                }}
              >
                <i className="bi bi-pencil"></i>
              </button>
              <button
                className="action-icon"
                title={school.status === "Active" ? "Suspend" : "Reactivate"}
                onClick={() => setSchoolToChange(school)}
              >
                <i
                  className={
                    school.status === "Active"
                      ? "bi bi-pause-circle"
                      : "bi bi-play-circle"
                  }
                ></i>
              </button>
            </div>,
          ])}
          withoutFilter={false}
          footer={`Showing ${filtered.length} of ${schools.length} schools`}
        />
      )}

      <DeleteConfirmationModal
        isOpen={Boolean(schoolToChange)}
        onClose={() => setSchoolToChange(null)}
        onConfirm={async () => {
          await handleUpdateStatus(schoolToChange.id, schoolToChange.status);
          setSchoolToChange(null);
        }}
        title={
          schoolToChange?.status === "Active"
            ? "Suspend school?"
            : "Reactivate school?"
        }
        message={
          schoolToChange?.status === "Active"
            ? "This will prevent the school from using the platform until reactivated."
            : "This will restore the school's platform access."
        }
        confirmLabel={
          schoolToChange?.status === "Active"
            ? "Suspend School"
            : "Reactivate School"
        }
      />
      <AddSchoolModal
        key={schoolToEdit?.id || "new-school"}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialData={schoolToEdit}
        title={schoolToEdit ? "Update School" : "Create School"}
        onSave={async (schoolData) => {
          await handleSaveSchool(schoolData, schoolToEdit?.id);
          setIsFormOpen(false);
        }}
      />
    </>
  );
}
