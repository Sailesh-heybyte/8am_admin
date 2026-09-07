import { useState } from "react";
import "./AddBusModal.scss";

const AddBusModal = ({ isOpen, onClose, onSave, schools = [] }) => {
  const [formData, setFormData] = useState({
    busNumber: "",
    school: "",
    driver: "",
    capacity: "",
    vehicleType: "School Bus",
    status: "Active",
    gpsDeviceId: "",
    insuranceExpiry: "",
    fitnessExpiry: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumericChange = (e) => {
    const { name, value } = e.target;

    const numericValue = value.replace(/\D/g, "");

    setFormData((prev) => ({
      ...prev,
      [name]: numericValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.busNumber.trim()) {
      alert("Please enter the bus number.");
      return;
    }

    if (!formData.school) {
      alert("Please select a school.");
      return;
    }

    if (!formData.capacity || Number(formData.capacity) <= 0) {
      alert("Please enter a valid bus capacity.");
      return;
    }

    onSave?.(formData);

    setFormData({
      busNumber: "",
      school: "",
      driver: "",
      capacity: "",
      vehicleType: "School Bus",
      status: "Active",
      gpsDeviceId: "",
      insuranceExpiry: "",
      fitnessExpiry: "",
    });

    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="add-school-overlay" onMouseDown={onClose}>
      <div
        className="add-school-modal"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="add-school-header">
          <div>
            <h2>Add Bus</h2>
            <p>Add a new bus to the 8AM fleet.</p>
          </div>

          <button type="button" className="add-school-close" onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="add-school-body">
            <div className="form-section">
              <h3 className="form-section-title">Bus Information</h3>

              <div className="form-row">
                <div className="form-field">
                  <label>Bus Number</label>

                  <input
                    type="text"
                    name="busNumber"
                    value={formData.busNumber}
                    onChange={handleChange}
                    placeholder="e.g. TS 09 AB 1234"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>School</label>

                  <select
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select school</option>
                    {schools.map((s) => (
                      <option key={s.id || s.schoolName} value={s.schoolName}>
                        {s.schoolName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label>Bus Capacity</label>

                  <input
                    type="text"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleNumericChange}
                    placeholder="e.g. 40"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="form-section-title">Driver Assignment</h3>

              <div className="form-row">
                <div className="form-field">
                  <label>Driver</label>

                  <select
                    name="driver"
                    value={formData.driver}
                    onChange={handleChange}
                  >
                    <option value="">Select driver</option>
                    <option value="Rajesh Kumar">Rajesh Kumar</option>
                    <option value="Suresh Yadav">Suresh Yadav</option>
                    <option value="Amit Singh">Amit Singh</option>
                    <option value="Vikram Das">Vikram Das</option>
                    <option value="Manoj Patel">Manoj Patel</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Vehicle Type</label>

                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                  >
                    <option value="School Bus">School Bus</option>
                    <option value="Mini Bus">Mini Bus</option>
                    <option value="Van">Van</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Status</label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="form-section-title">GPS & Tracking Information</h3>

              <div className="form-row">
                <div className="form-field">
                  <label>GPS Device ID</label>

                  <input
                    type="text"
                    name="gpsDeviceId"
                    value={formData.gpsDeviceId}
                    onChange={handleChange}
                    placeholder="Enter GPS device ID"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="form-section-title">Vehicle Documents</h3>

              <div className="form-row">
                <div className="form-field">
                  <label>Insurance Expiry</label>

                  <input
                    type="date"
                    name="insuranceExpiry"
                    value={formData.insuranceExpiry}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label>Fitness Certificate Expiry</label>

                  <input
                    type="date"
                    name="fitnessExpiry"
                    value={formData.fitnessExpiry}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="add-school-footer">
            <button type="button" className="modal-cancel" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="modal-save">
              Add Bus
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBusModal;
