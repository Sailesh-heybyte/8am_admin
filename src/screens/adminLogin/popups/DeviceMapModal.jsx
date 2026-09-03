import { useState } from "react";
import "./DeviceModal.scss";

const schoolMatches = (busSchool, selectedSchool) => {
  const busName = busSchool.toLowerCase().replace(/ school$/, "");
  const selectedName = selectedSchool.toLowerCase().replace(/ school$/, "");
  return (
    busName === selectedName ||
    busName.startsWith(selectedName) ||
    selectedName.startsWith(busName)
  );
};

export default function DeviceMapModal({
  isOpen,
  device,
  buses,
  schools,
  onClose,
  onSave,
}) {
  const mappedBus = buses.find(
    (bus) => String(bus.id) === String(device?.busId),
  );
  const mappedSchool = schools.find((item) =>
    mappedBus ? schoolMatches(mappedBus.school, item.schoolName) : false,
  );
  const [school, setSchool] = useState(mappedSchool?.schoolName || "");
  const [busId, setBusId] = useState(device?.busId || "");
  if (!isOpen || !device) return null;
  return (
    <div className="device-overlay" onMouseDown={onClose}>
      <div
        className="device-modal device-map-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="device-header">
          <div>
            <h2>Map Device to Bus</h2>
            <p>Choose a bus for {device.name}.</p>
          </div>
          <button className="device-close" type="button" onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSave(busId);
          }}
        >
          <div className="device-body">
            <label className="device-select-label">
              School
              <select
                value={school}
                onChange={(event) => {
                  setSchool(event.target.value);
                  setBusId("");
                }}
                required
              >
                <option value="">Select school</option>
                {schools.map((item) => (
                  <option key={item.id} value={item.schoolName}>
                    {item.schoolName}
                  </option>
                ))}
              </select>
            </label>
            <label className="device-select-label">
              Bus
              <select
                value={busId}
                onChange={(event) => setBusId(event.target.value)}
                required
              >
                <option value="">
                  {school ? "Select bus" : "Select a school first"}
                </option>
                {buses
                  .filter(
                    (bus) =>
                      schoolMatches(bus.school, school) &&
                      (!bus.deviceId ||
                        String(bus.deviceId) === String(device.id)),
                  )
                  .map((bus) => (
                    <option key={bus.id} value={bus.id}>
                      {bus.busNumber} · {bus.school}
                    </option>
                  ))}
              </select>
            </label>
          </div>
          <div className="device-footer">
            <button type="button" className="modal-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-save">
              Save Mapping
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
