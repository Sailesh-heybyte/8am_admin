import { useState } from "react";
import "./DeviceModal.scss";

const emptyDevice = {
  name: "",
  serialNumber: "",
  model: "",
  manufacturer: "",
  status: "Active",
};

export default function DeviceModal({ isOpen, device, onClose, onSave }) {
  const [formData, setFormData] = useState({ ...emptyDevice, ...device });
  if (!isOpen) return null;
  const change = (event) =>
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  return (
    <div className="device-overlay" onMouseDown={onClose}>
      <div
        className="device-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="device-header">
          <div>
            <h2>{device ? "Update Device" : "Register Device"}</h2>
            <p>Add a tracking device to the BusGuard platform.</p>
          </div>
          <button className="device-close" type="button" onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSave(formData);
          }}
        >
          <div className="device-body">
            <div className="device-fields">
              <label>
                Device Name
                <input
                  name="name"
                  value={formData.name}
                  onChange={change}
                  placeholder="e.g. GPS Tracker 01"
                  required
                />
              </label>
              <label>
                Serial Number
                <input
                  name="serialNumber"
                  value={formData.serialNumber}
                  onChange={change}
                  placeholder="DEV-10001"
                  required
                />
              </label>
              <label>
                Model
                <input
                  name="model"
                  value={formData.model}
                  onChange={change}
                  placeholder="TrackPro X2"
                  required
                />
              </label>
              <label>
                Manufacturer
                <input
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={change}
                  placeholder="TrackPro"
                  required
                />
              </label>
              <label>
                Status
                <select name="status" value={formData.status} onChange={change}>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Maintenance</option>
                </select>
              </label>
            </div>
          </div>
          <div className="device-footer">
            <button type="button" className="modal-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-save">
              {device ? "Save Changes" : "Register Device"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
