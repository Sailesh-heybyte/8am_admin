import { useEffect, useState } from "react";
import { getSchools } from "../../../api/schools.js";
import { getBranches } from "../../../api/branches.js";
import "./AddSchoolModal.scss";
import "./DeviceModal.scss";

export default function DeviceMapModal({ isOpen, device, onClose, onMap }) {
  const [schools, setSchools] = useState([]);
  const [schoolsLoading, setSchoolsLoading] = useState(true);

  const [selectedSchoolId, setSelectedSchoolId] = useState("");
  const [branches, setBranches] = useState([]);
  const [branchesLoading, setBranchesLoading] = useState(false);

  const [selectedBranchId, setSelectedBranchId] = useState("");
  const [selectedBusId, setSelectedBusId] = useState("");

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
    setSelectedBusId("");
    setBranches([]);
    setError("");
    setSchoolsLoading(true);
    onClose?.();
  };

  const handleSchoolChange = async (event) => {
    const schoolId = event.target.value;
    setSelectedSchoolId(schoolId);
    setSelectedBranchId("");
    setSelectedBusId("");
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

  const handleBranchChange = (event) => {
    const branchId = event.target.value;
    setSelectedBranchId(branchId);
    setSelectedBusId("");
  };

  const handleMap = async (event) => {
    event?.preventDefault();
    setError("");
    setIsSaving(true);
    try {
      await onMap?.(selectedBusId);
    } catch (err) {
      setError(err.message || "Failed to map device.");
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
            <h2>Map Device to Bus</h2>
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
                  <label>Serial Number</label>
                  <span className="device-serial-cell">
                    {device?.serialNumber}
                  </span>
                </div>

                <div className="form-field full">
                  <label>School</label>
                  <select
                    value={selectedSchoolId}
                    onChange={handleSchoolChange}
                    disabled={schoolsLoading || isSaving}
                  >
                    <option value="">Select a school</option>
                    {schools.map((school) => (
                      <option key={school.id} value={school.id}>
                        {school.schoolName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field full">
                  <label>Branch</label>
                  <select
                    value={selectedBranchId}
                    onChange={handleBranchChange}
                    disabled={!selectedSchoolId || branchesLoading || isSaving}
                  >
                    <option value="">Select a branch</option>
                    {branches.map((branch) => (
                      <option key={branch.id} value={branch.id}>
                        {branch.branchName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field full">
                  <label>Bus</label>
                  <select
                    value={selectedBusId}
                    onChange={(event) => setSelectedBusId(event.target.value)}
                    disabled={!selectedBranchId || isSaving}
                  >
                    <option value="">Select a bus</option>
                  </select>
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
              disabled={!selectedBusId || isSaving}
            >
              {isSaving ? "Mapping..." : "Map Device"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
