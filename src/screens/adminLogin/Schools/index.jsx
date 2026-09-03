import { useMemo, useState } from "react";

import PageTitle from "../../../components/PageTitle.jsx";
import DataTable from "../../../components/DataTable.jsx";
import StatusBadge from "../../../components/StatusBadge.jsx";
import DeleteConfirmationModal from "../popups/DeleteConfirmationModal.jsx";
import AddSchoolModal from "../popups/AddSchoolModal.jsx";
import SchoolDetails from "./SchoolDetails.jsx";

export default function Schools({ schools, onSaveSchool, onUpdateStatus }) {
  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("All States");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [schoolToChange, setSchoolToChange] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [schoolToEdit, setSchoolToEdit] = useState(null);

  const filtered = useMemo(
    () =>
      schools.filter(
        (school) =>
          Object.values(school)
            .join(" ")
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (stateFilter === "All States" || school.state === stateFilter) &&
          (statusFilter === "All Status" || school.status === statusFilter),
      ),
    [query, stateFilter, statusFilter, schools],
  );

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
          onConfirm={() => {
            onUpdateStatus(
              schoolToChange.id,
              schoolToChange.status === "Active" ? "Suspended" : "Active",
            );
            setSelectedSchool({
              ...schoolToChange,
              status:
                schoolToChange.status === "Active" ? "Suspended" : "Active",
            });
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
          onSave={(school) => {
            onSaveSchool(school, schoolToEdit?.id);
            setSelectedSchool({ ...selectedSchool, ...school });
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
              <option>Andhra Pradesh</option>
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
        className="schools-table-card"
        onRowClick={(index) => setSelectedSchool(filtered[index])}
        rows={filtered.map((school) => [
          <button
            className="table-link school-name-link"
            onClick={() => setSelectedSchool(school)}
          >
            <div className="school-mini">
              <div className="school-logo">{school.schoolName.charAt(0)}</div>
              <strong>{school.schoolName}</strong>
            </div>
          </button>,
          school.city,
          school.state,
          school.studentCount,
          school.busCount,
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
        footer={`Showing 1–${filtered.length} of 248 schools`}
      />

      <DeleteConfirmationModal
        isOpen={Boolean(schoolToChange)}
        onClose={() => setSchoolToChange(null)}
        onConfirm={() => {
          onUpdateStatus(
            schoolToChange.id,
            schoolToChange.status === "Active" ? "Suspended" : "Active",
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
        title={schoolToEdit ? "Update School" : "Create School"}
        onSave={(school) => {
          onSaveSchool(school, schoolToEdit?.id);
          setIsFormOpen(false);
        }}
      />
    </>
  );
}
