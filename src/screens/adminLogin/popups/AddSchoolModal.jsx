import { useState } from "react";
import "./AddSchoolModal.scss";

const emptyFormData = {
  schoolName: "",
  schoolCode: "",
  schoolGroup: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  studentCount: "",
  busCount: "",
  adminName: "",
  adminEmail: "",
  adminPhone: "",
};

const AddSchoolModal = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  title = "Add School",
}) => {
  const [formData, setFormData] = useState({
    ...emptyFormData,
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle numeric input only (for phone and pincode)
  const handleNumericChange = (e) => {
    const { name, value } = e.target;
    // Only allow digits
    const numericValue = value.replace(/\D/g, "");

    // Optional: Limit length for specific fields
    let finalValue = numericValue;
    if (name === "phone" || name === "adminPhone") {
      finalValue = numericValue.slice(0, 10);
    } else if (name === "pincode") {
      finalValue = numericValue.slice(0, 6);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  // Handle number input for studentCount and busCount
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    // Only allow digits
    const numericValue = value.replace(/\D/g, "");

    setFormData((prev) => ({
      ...prev,
      [name]: numericValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate phone numbers (10 digits)
    const phoneFields = ["phone", "adminPhone"];
    for (const field of phoneFields) {
      if (formData[field] && formData[field].length !== 10) {
        alert(`Phone number must be exactly 10 digits.`);
        return;
      }
    }

    // Validate pincode (6 digits)
    if (formData.pincode && formData.pincode.length !== 6) {
      alert("Pincode must be exactly 6 digits.");
      return;
    }

    onSave?.(formData);
    onClose();

    setFormData(emptyFormData);
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
        {/* Header */}
        <div className="add-school-header">
          <div>
            <h2>{title}</h2>
            <p>Add a new school to the BusGuard platform.</p>
          </div>

          <button type="button" className="add-school-close" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="add-school-body">
            {/* School Information */}
            <div className="form-section">
              <div className="form-section-title">
                <h3>School Information</h3>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>School Name</label>

                  <input
                    type="text"
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleChange}
                    placeholder="Enter school name"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>School Code</label>

                  <input
                    type="text"
                    name="schoolCode"
                    value={formData.schoolCode}
                    onChange={handleChange}
                    placeholder="e.g. SCH001"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>School Group</label>

                  <select
                    name="schoolGroup"
                    value={formData.schoolGroup}
                    onChange={handleChange}
                  >
                    <option value="">Select school group</option>
                    <option value="Greenfield Education Group">
                      Greenfield Education Group
                    </option>
                    <option value="Delhi Public School Society">
                      Delhi Public School Society
                    </option>
                    <option value="Ryan International Group">
                      Ryan International Group
                    </option>
                    <option value="Narayana Education Group">
                      Narayana Education Group
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="form-section">
              <div className="form-section-title">
                <h3>Contact Information</h3>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="school@example.com"
                  />
                </div>

                <div className="form-field">
                  <label>Phone Number</label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleNumericChange}
                    placeholder="9876543210"
                    maxLength="10"
                    pattern="[0-9]{10}"
                    title="Please enter exactly 10 digits"
                  />
                </div>

                <div className="form-field full">
                  <label>Address</label>

                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter school address"
                  />
                </div>
              </div>
              <div className="form-row" style={{ marginTop: "1rem" }}>
                <div className="form-field">
                  <label>City</label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Hyderabad"
                  />
                </div>

                <div className="form-field">
                  <label>State</label>

                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  >
                    <option value="">Select state</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Pincode</label>

                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleNumericChange}
                    placeholder="500072"
                    maxLength="6"
                    pattern="[0-9]{6}"
                    title="Please enter exactly 6 digits"
                  />
                </div>
              </div>
            </div>

            {/* Transport Information */}
            <div className="form-section">
              <div className="form-section-title">
                <h3>Transport Information</h3>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Total Students</label>

                  <input
                    type="text"
                    name="studentCount"
                    value={formData.studentCount}
                    onChange={handleNumberChange}
                    placeholder="1200"
                  />
                </div>

                <div className="form-field">
                  <label>Total Buses</label>

                  <input
                    type="text"
                    name="busCount"
                    value={formData.busCount}
                    onChange={handleNumberChange}
                    placeholder="25"
                  />
                </div>
              </div>
            </div>

            {/* School Admin */}
            <div className="form-section">
              <div className="form-section-title">
                <h3>School Administrator</h3>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Admin Name</label>

                  <input
                    type="text"
                    name="adminName"
                    value={formData.adminName}
                    onChange={handleChange}
                    placeholder="Enter admin name"
                  />
                </div>

                <div className="form-field">
                  <label>Admin Email</label>

                  <input
                    type="email"
                    name="adminEmail"
                    value={formData.adminEmail}
                    onChange={handleChange}
                    placeholder="admin@school.com"
                  />
                </div>

                <div className="form-field">
                  <label>Admin Phone</label>

                  <input
                    type="tel"
                    name="adminPhone"
                    value={formData.adminPhone}
                    onChange={handleNumericChange}
                    placeholder="9876543210"
                    maxLength="10"
                    pattern="[0-9]{10}"
                    title="Please enter exactly 10 digits"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="add-school-footer">
            <button type="button" className="modal-cancel" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="modal-save">
              {title}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSchoolModal;
