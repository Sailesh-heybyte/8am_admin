import { useState } from "react";
import "./AddUserModal.scss";

const AddUserModal = ({
  isOpen,
  onClose,
  onSave,
  roles = [],
  title = "Add User",
}) => {
  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    department: "",
    role: "",
    access: "",
    status: "Active",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "role"
        ? {
            access:
              roles.find((role) => role.name === value)?.access || "Custom",
          }
        : {}),
    }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);

    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.phone && formData.phone.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    onSave?.(formData);

    setFormData(initialFormData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="add-user-overlay" onMouseDown={onClose}>
      <div className="add-user-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="add-user-header">
          <div>
            <h2>{title}</h2>
            <p>Create an 8AM platform staff account and assign its role.</p>
          </div>

          <button type="button" className="add-user-close" onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="add-user-body">
            <div className="form-section">
              <h3 className="form-section-title">User Information</h3>

              <div className="form-row">
                <div className="form-field">
                  <label>Full Name</label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Email Address</label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="user@example.com"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Phone Number</label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="9876543210"
                    maxLength="10"
                  />
                </div>
              </div>
              <div className="form-row" style={{ marginTop: "3%" }}>
                <div className="form-field">
                  <label>Department</label>

                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="e.g. Platform Operations"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="form-section-title">Role & Access</h3>

              <div className="form-row">
                <div className="form-field">
                  <label>User Role</label>

                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select role</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label>Access Level</label>

                  <select
                    name="access"
                    value={formData.access}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select access</option>
                    <option value="All">All</option>
                    <option value="Limited">Limited</option>
                    <option value="Reports">Reports</option>
                    <option value="Read Only">Read Only</option>
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
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="add-user-footer">
            <button type="button" className="modal-cancel" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="modal-save">
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
