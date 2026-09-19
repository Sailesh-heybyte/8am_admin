import { useEffect, useMemo, useState } from "react";
import { getSchools } from "../../../api/schools.js";
import { getBusesBySchool } from "../../../api/buses.js";
import TypeAhead from "../../../components/TypeAhead.jsx";
import "./AddSchoolModal.scss";
import "./DeviceModal.scss";

export default function DeviceMapModal({ isOpen, device, onClose, onMap }) {
  const [schools, setSchools] = useState([]);
  const [schoolsLoading, setSchoolsLoading] = useState(true);

  const [selectedSchoolId, setSelectedSchoolId] = useState("");
  const [selectedBranchId, setSelectedBranchId] = useState("");

  const [buses, setBuses] = useState([]);
  const [busesLoading, setBusesLoading] = useState(false);
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

  const branchOptions = useMemo(() => {
    const branchMap = new Map();
    for (const bus of buses) {
      if (bus.branchId && !branchMap.has(bus.branchId)) {
        branchMap.set(bus.branchId, bus.branchName);
      }
    }
    return Array.from(branchMap.entries())
      .map(([branchId, branchName]) => ({
        value: branchId,
        label: branchName,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [buses]);

  const visibleBuses = useMemo(() => {
    if (!selectedBranchId) return [];
    return buses.filter((bus) => bus.branchId === selectedBranchId);
  }, [buses, selectedBranchId]);

  if (!isOpen) return null;

  const handleClose = () => {
    if (isSaving) return;
    setSelectedSchoolId("");
    setSelectedBranchId("");
    setSelectedBusId("");
    setBuses([]);
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
    setSelectedBusId("");
    setBuses([]);
    setError("");

    if (!schoolId) {
      return;
    }

    setBusesLoading(true);
    try {
      const data = await getBusesBySchool(schoolId);
      setBuses(data);
    } catch (err) {
      setError(err.message || "Failed to load buses.");
      setBuses([]);
    } finally {
      setBusesLoading(false);
    }
  };

  const handleBranchChange = (valueOrEvent) => {
    const branchId =
      typeof valueOrEvent === "object" && valueOrEvent?.target
        ? valueOrEvent.target.value
        : valueOrEvent || "";
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
                    disabled={!selectedSchoolId || busesLoading || isSaving}
                    loading={busesLoading}
                    emptyMessage="No branches available"
                    noMatchMessage="No branches found"
                  />
                </div>

                <div className="form-field full">
                  <label>Bus</label>
                  <TypeAhead
                    options={visibleBuses.map((bus) => ({
                      value: bus.id,
                      label: `${bus.name} · ${bus.registrationNumber}`,
                    }))}
                    value={selectedBusId}
                    onChange={(busId) => setSelectedBusId(busId)}
                    placeholder="Select a bus"
                    disabled={!selectedBranchId || isSaving}
                    emptyMessage="No buses available"
                    noMatchMessage="No buses found"
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
