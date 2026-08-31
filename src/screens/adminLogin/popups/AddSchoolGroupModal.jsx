import { useState } from "react";
import "./AddSchoolGroupModal.scss";

const AddSchoolGroupModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    groupName: "",
    groupCode: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    status: "Active",
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

    let finalValue = numericValue;

    if (name === "phone" || name === "contactPhone") {
      finalValue = numericValue.slice(0, 10);
    } else if (name === "pincode") {
      finalValue = numericValue.slice(0, 6);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.phone && formData.phone.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    if (formData.contactPhone && formData.contactPhone.length !== 10) {
      alert("Contact phone number must be exactly 10 digits.");
      return;
    }

    if (formData.pincode && formData.pincode.length !== 6) {
      alert("Pincode must be exactly 6 digits.");
      return;
    }

    onSave?.(formData);

    setFormData({
      groupName: "",
      groupCode: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      contactPerson: "",
      contactEmail: "",
      contactPhone: "",
      status: "Active",
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
            <h2>Add School Group</h2>
            <p>Add a new education group or school chain.</p>
          </div>

          <button type="button" className="add-school-close" onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="add-school-body">
            <div className="form-section">
              <h3 className="form-section-title">Group Information</h3>

              <div className="form-row">
                <div className="form-field">
                  <label>Group Name</label>

                  <input
                    type="text"
                    name="groupName"
                    value={formData.groupName}
                    onChange={handleChange}
                    placeholder="Enter group name"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Group Code</label>

                  <input
                    type="text"
                    name="groupCode"
                    value={formData.groupCode}
                    onChange={handleChange}
                    placeholder="e.g. GRP001"
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
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="form-section-title">Group Contact Information</h3>

              <div className="form-row">
                <div className="form-field">
                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="group@example.com"
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
                  />
                </div>

                <div className="form-field ">
                  <label>Address</label>

                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter group address"
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
                  </select>
                </div>

                <div className="form-field">
                  <label>Pincode</label>

                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleNumericChange}
                    placeholder="500001"
                    maxLength="6"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="form-section-title">Primary Contact Person</h3>

              <div className="form-row">
                <div className="form-field">
                  <label>Contact Person Name</label>

                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    placeholder="Enter contact name"
                  />
                </div>

                <div className="form-field">
                  <label>Contact Email</label>

                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    placeholder="contact@example.com"
                  />
                </div>

                <div className="form-field">
                  <label>Contact Phone</label>

                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleNumericChange}
                    placeholder="9876543210"
                    maxLength="10"
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
              Add Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSchoolGroupModal;
