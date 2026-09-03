import { useState } from "react";
import "./BranchModal.scss";

const emptyBranch = {
  branchName: "",
  branchCode: "",
  schoolId: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  studentCount: "",
  busCount: "",
  coordinatorName: "",
  coordinatorEmail: "",
  status: "Active",
};

export default function BranchModal({
  isOpen,
  branch,
  schools,
  onClose,
  onSave,
}) {
  const [formData, setFormData] = useState({ ...emptyBranch, ...branch });

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      ...formData,
      studentCount: formData.studentCount || "0",
      busCount: formData.busCount || "0",
    });
  };

  return (
    <div className="branch-overlay" onMouseDown={onClose}>
      <div
        className="branch-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="branch-header">
          <div>
            <h2>{branch ? "Update Branch" : "Create Branch"}</h2>
            <p>Manage branch information and its school association.</p>
          </div>
          <button type="button" className="branch-close" onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="branch-body">
            <div className="branch-section">
              <h3>Branch Information</h3>
              <div className="branch-fields">
                <label>
                  Branch Name
                  <input
                    name="branchName"
                    value={formData.branchName}
                    onChange={handleChange}
                    placeholder="e.g. Greenwood Jubilee Hills"
                    required
                  />
                </label>
                <label>
                  Branch Code
                  <input
                    name="branchCode"
                    value={formData.branchCode}
                    onChange={handleChange}
                    placeholder="e.g. BR001"
                    required
                  />
                </label>
                <label>
                  School
                  <select
                    name="schoolId"
                    value={formData.schoolId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select school</option>
                    {schools.map((school) => (
                      <option key={school.id} value={school.id}>
                        {school.schoolName}
                      </option>
                    ))}
                  </select>
                </label>{" "}
                <label>
                  Status
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="branch-section">
              <h3>Contact & Location</h3>
              <div className="branch-fields">
                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="branch@example.com"
                  />
                </label>
                <label>
                  Phone
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    maxLength="10"
                  />
                </label>
                <label className="branch-wide">
                  Address
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Branch address"
                  />
                </label>
                <label>
                  City
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Hyderabad"
                    required
                  />
                </label>
                <label>
                  State
                  <input
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Telangana"
                    required
                  />
                </label>
                <label>
                  Pincode
                  <input
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="500072"
                    maxLength="6"
                  />
                </label>
              </div>
            </div>
            <div className="branch-section">
              <h3>Operations & Coordinator</h3>
              <div className="branch-fields">
                <label>
                  Students
                  <input
                    type="number"
                    min="0"
                    name="studentCount"
                    value={formData.studentCount}
                    onChange={handleChange}
                    placeholder="500"
                  />
                </label>
                <label>
                  Buses
                  <input
                    type="number"
                    min="0"
                    name="busCount"
                    value={formData.busCount}
                    onChange={handleChange}
                    placeholder="12"
                  />
                </label>
                <label>
                  Coordinator Name
                  <input
                    name="coordinatorName"
                    value={formData.coordinatorName}
                    onChange={handleChange}
                    placeholder="Branch coordinator"
                  />
                </label>
                <label>
                  Coordinator Email
                  <input
                    type="email"
                    name="coordinatorEmail"
                    value={formData.coordinatorEmail}
                    onChange={handleChange}
                    placeholder="coordinator@example.com"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="branch-footer">
            <button type="button" className="modal-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-save">
              {branch ? "Save Changes" : "Create Branch"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
