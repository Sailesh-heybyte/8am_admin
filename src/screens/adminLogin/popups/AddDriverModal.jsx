import { useState } from "react";
import "./AddDriverModal.scss";

const AddDriverModal = ({ isOpen, onClose, onSave, schools = [], buses = [] }) => {
  const initialFormData = {
    driverName: "",
    driverId: "",
    phone: "",
    email: "",
    licenseNumber: "",
    licenseExpiry: "",
    school: "",
    bus: "",
    joiningDate: "",
    status: "Active",
  };

  const [formData, setFormData] = useState(initialFormData);

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

    const finalValue =
      name === "phone" ? numericValue.slice(0, 10) : numericValue;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.driverName.trim()) {
      alert("Please enter the driver name.");
      return;
    }

    if (!formData.driverId.trim()) {
      alert("Please enter the driver ID.");
      return;
    }

    if (formData.phone && formData.phone.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    if (!formData.licenseNumber.trim()) {
      alert("Please enter the driving license number.");
      return;
    }

    onSave?.(formData);

    setFormData(initialFormData);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="add-driver-overlay" onMouseDown={onClose}>
      <div
        className="add-driver-modal"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="add-driver-header">
          <div>
            <h2>Add Driver</h2>
            <p>Add a new driver to the 8AM platform.</p>
          </div>

          <button type="button" className="add-driver-close" onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="add-driver-body">
            <div className="form-section">
              <h3 className="form-section-title">Driver Information</h3>

              <div className="form-row">
                <div className="form-field">
                  <label>Driver Name</label>

                  <input
                    type="text"
                    name="driverName"
                    value={formData.driverName}
                    onChange={handleChange}
                    placeholder="Enter driver name"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Driver ID</label>

                  <input
                    type="text"
                    name="driverId"
                    value={formData.driverId}
                    onChange={handleChange}
                    placeholder="e.g. DRV001"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Status</label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="form-section-title">Contact Information</h3>

              <div className="form-row">
                <div className="form-field">
                  <label>Phone Number</label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleNumericChange}
                    placeholder="9876543210"
                    maxLength="10"
                  />
                </div>

                <div className="form-field">
                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="driver@example.com"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="form-section-title">License Information</h3>

              <div className="form-row">
                <div className="form-field">
                  <label>Driving License Number</label>

                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    placeholder="Enter license number"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>License Expiry Date</label>

                  <input
                    type="date"
                    name="licenseExpiry"
                    value={formData.licenseExpiry}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label>Joining Date</label>

                  <input
                    type="date"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="form-section-title">Driver Assignment</h3>

              <div className="form-row">
                <div className="form-field">
                  <label>School</label>

                  <select
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
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
                  <label>Assigned Bus</label>

                  <select
                    name="assignedBus"
                    value={formData.assignedBus}
                    onChange={handleChange}
                  >
                    <option value="">Select bus</option>
                    {buses.map((b) => (
                      <option key={b.id || b.busNumber} value={b.busNumber}>
                        {b.busNumber}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="add-driver-footer">
            <button type="button" className="modal-cancel" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="modal-save">
              Add Driver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDriverModal;
