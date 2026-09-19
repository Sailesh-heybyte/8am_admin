import { useEffect, useMemo, useState } from "react";
import { getSchools } from "../../../api/schools.js";
import { getStudentsBySchool } from "../../../api/students.js";
import TypeAhead from "../../../components/TypeAhead.jsx";
import "./AddSchoolModal.scss";
import "./DeviceModal.scss";

export default function CardMapModal({ isOpen, card, onClose, onMap }) {
  const [schools, setSchools] = useState([]);
  const [schoolsLoading, setSchoolsLoading] = useState(true);

  const [selectedSchoolId, setSelectedSchoolId] = useState("");
  const [selectedBranchId, setSelectedBranchId] = useState("");

  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
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

  const branchOptions = useMemo(() => {
    const branchMap = new Map();
    for (const student of students) {
      if (student.branchId && !branchMap.has(student.branchId)) {
        branchMap.set(student.branchId, student.branchName);
      }
    }
    return Array.from(branchMap.entries())
      .map(([branchId, branchName]) => ({
        value: branchId,
        label: branchName,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [students]);

  const visibleStudents = useMemo(() => {
    if (!selectedBranchId) return [];
    return students.filter((student) => student.branchId === selectedBranchId);
  }, [students, selectedBranchId]);

  if (!isOpen) return null;

  const handleClose = () => {
    if (isSaving) return;
    setSelectedSchoolId("");
    setSelectedBranchId("");
    setSelectedStudentId("");
    setStudents([]);
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
    setStudents([]);
    setError("");

    if (!schoolId) {
      return;
    }

    setStudentsLoading(true);
    try {
      const data = await getStudentsBySchool(schoolId);
      setStudents(data);
      if (data.length === 0) {
        setError(
          "No students found for this school. Add a student before mapping a card."
        );
      }
    } catch (err) {
      setError(err.message || "Failed to load students.");
      setStudents([]);
    } finally {
      setStudentsLoading(false);
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
                    options={branchOptions}
                    value={selectedBranchId}
                    onChange={handleBranchChange}
                    placeholder="Select a branch"
                    disabled={!selectedSchoolId || studentsLoading || isSaving}
                    loading={studentsLoading}
                    emptyMessage="No branches available"
                    noMatchMessage="No branches found"
                  />
                </div>

                <div className="form-field full">
                  <label>Student</label>
                  <TypeAhead
                    options={visibleStudents.map((student) => ({
                      value: student.id,
                      label: `${student.fullName} · ${student.admissionNumber}`,
                    }))}
                    value={selectedStudentId}
                    onChange={(studentId) => setSelectedStudentId(studentId)}
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
