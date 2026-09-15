import { useEffect, useState } from "react";
import { getSchools } from "../../../api/schools.js";
import { getBranches } from "../../../api/branches.js";
import TypeAhead from "../../../components/TypeAhead.jsx";
import "./AddSchoolModal.scss";
import "./DeviceModal.scss";

export default function CardMapModal({ isOpen, card, onClose, onMap }) {
  const [schools, setSchools] = useState([]);
  const [schoolsLoading, setSchoolsLoading] = useState(true);

  const [selectedSchoolId, setSelectedSchoolId] = useState("");
  const [branches, setBranches] = useState([]);
  const [branchesLoading, setBranchesLoading] = useState(false);

  const [selectedBranchId, setSelectedBranchId] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");

  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;

    getSchools()
      .then((data) => {
        if (isMounted) {
          setSchools(data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to load schools.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setSchoolsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    if (isSaving) return;
    setSelectedSchoolId("");
    setSelectedBranchId("");
    setSelectedStudentId("");
    setBranches([]);
    setError("");
    setSchoolsLoading(true);
    onClose?.();
  };

  const handleSchoolChange = async (valueOrEvent) => {
    const schoolId =
      typeof valueOrEvent === "object" && valueOrEvent?.target
        ? valueOrEvent.target.value
        : valueOrEvent || "";
    setSelectedSchoolId(schoolId);
    setSelectedBranchId("");
    setSelectedStudentId("");
    setError("");

    if (!schoolId) {
      setBranches([]);
      return;
    }

    setBranchesLoading(true);
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

  const handleBranchChange = (valueOrEvent) => {
    const branchId =
      typeof valueOrEvent === "object" && valueOrEvent?.target
        ? valueOrEvent.target.value
        : valueOrEvent || "";
    setSelectedBranchId(branchId);
    setSelectedStudentId("");
  };

  const handleMap = async (event) => {
    event?.preventDefault();
    setError("");
    setIsSaving(true);
    try {
      await onMap?.(selectedStudentId);
    } catch (err) {
      setError(err.message || "Failed to map card.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="add-school-overlay" onMouseDown={handleClose}>
      <div
        className="add-school-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="add-school-header">
          <div>
            <h2>Map Card to Student</h2>
          </div>
          <button
            type="button"
            className="add-school-close"
            onClick={handleClose}
            disabled={isSaving}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleMap}>
          <div className="add-school-body">
            <div className="form-section">
              <div className="form-row">
                <div className="form-field full">
                  <label>Card Number</label>
                  <span className="device-serial-cell">
                    {card?.cardNumber}
                  </span>
                </div>

                <div className="form-field full">
                  <label>School</label>
                  <TypeAhead
                    options={schools.map((school) => ({
                      value: school.id,
                      label: school.schoolName,
                    }))}
                    value={selectedSchoolId}
                    onChange={handleSchoolChange}
                    placeholder="Select a school"
                    disabled={schoolsLoading || isSaving}
                    emptyMessage="No schools available"
                    noMatchMessage="No schools found"
                  />
                </div>

                <div className="form-field full">
                  <label>Branch</label>
                  <TypeAhead
                    options={branches.map((branch) => ({
                      value: branch.id,
                      label: branch.branchName,
                    }))}
                    value={selectedBranchId}
                    onChange={handleBranchChange}
                    placeholder="Select a branch"
                    disabled={!selectedSchoolId || branchesLoading || isSaving}
                    emptyMessage="No branches available"
                    noMatchMessage="No branches found"
                  />
                </div>

                <div className="form-field full">
                  <label>Student</label>
                  <TypeAhead
                    options={[]}
                    value={selectedStudentId}
                    onChange={(studentId) => {
                      setSelectedStudentId(studentId);
                      setError("");
                    }}
                    placeholder="Select a student"
                    disabled={!selectedBranchId || isSaving}
                    emptyMessage="No students available"
                    noMatchMessage="No students found"
                  />
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="add-user-error" role="alert">
              <i className="bi bi-exclamation-circle-fill" aria-hidden="true"></i>
              <span>{error}</span>
            </div>
          )}

          <div className="add-school-footer">
            <button
              type="button"
              className="modal-cancel"
              onClick={handleClose}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="modal-save"
              disabled={!selectedStudentId || isSaving}
            >
              {isSaving ? "Mapping..." : "Map Card"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
