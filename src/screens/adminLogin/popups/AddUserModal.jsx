import { useState, useEffect } from "react";
import "./AddUserModal.scss";
import { getRoles } from "../../../api/roles.js";

const AddUserModal = ({
  isOpen,
  onClose,
  onSave,
  roles: propRoles,
  rolesLoading: propRolesLoading,
  rolesError: propRolesError,
  title = "Add User",
}) => {
  const [internalRoles, setInternalRoles] = useState([]);
  const [internalRolesLoading, setInternalRolesLoading] = useState(false);
  const [internalRolesError, setInternalRolesError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    if (propRoles && propRoles.length > 0) {
      return;
    }

    let isMounted = true;
    setInternalRolesLoading(true);
    setInternalRolesError("");

    getRoles()
      .then((data) => {
        if (isMounted) {
          setInternalRoles(Array.isArray(data) ? data : []);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setInternalRolesError(err.message || "Failed to load roles.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setInternalRolesLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, propRoles]);

  const roles = propRoles && propRoles.length > 0 ? propRoles : internalRoles;
  const rolesLoading =
    propRolesLoading !== undefined ? propRolesLoading : internalRolesLoading;
  const rolesError = propRolesError || internalRolesError;
  const initialFormData = {
    // Required
    fullName: "",
    email: "",
    phoneNumber: "",
    roleIds: [],

    // Personal
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    nationality: "",
    joiningDate: "",

    // Address
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",

    // Emergency contact
    emergencyName: "",
    emergencyRelationship: "",
    emergencyPhone: "",

    // Bank
    bankName: "",
    bankAccountNumber: "",
    bankIfscCode: "",

    // Government
    panNumber: "",
    aadhaarNumber: "",

    // Other
    skills: "",
    notes: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Digits only, capped at 10. Used for both phone fields.
  const handleDigitsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.replace(/\D/g, "").slice(0, 10),
    }));
  };

  // Aadhaar is 12 digits, not 10.
  const handleAadhaarChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      aadhaarNumber: e.target.value.replace(/\D/g, "").slice(0, 12),
    }));
  };

  const handleRoleToggle = (roleId) => {
    setFormData((prev) => {
      const exists = prev.roleIds.includes(roleId);
      return {
        ...prev,
        roleIds: exists
          ? prev.roleIds.filter((id) => id !== roleId)
          : [...prev.roleIds, roleId],
      };
    });
  };

  const handleClose = () => {
    setError("");
    setFormData(initialFormData);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.phoneNumber.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    if (formData.roleIds.length === 0) {
      setError("At least one role must be selected.");
      return;
    }

    if (formData.emergencyPhone && formData.emergencyPhone.length !== 10) {
      setError("Emergency contact phone must be exactly 10 digits.");
      return;
    }

    if (formData.aadhaarNumber && formData.aadhaarNumber.length !== 12) {
      setError("Aadhaar number must be exactly 12 digits.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave?.({
        ...formData,
        phoneNumber: `+91${formData.phoneNumber}`,
        emergencyPhone: formData.emergencyPhone
          ? `+91${formData.emergencyPhone}`
          : "",
        panNumber: formData.panNumber.toUpperCase(),
        bankIfscCode: formData.bankIfscCode.toUpperCase(),
      });
      setFormData(initialFormData);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to create user. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Roles area: loading, error, empty, or the checkbox list.
  const renderRoles = () => {
    if (rolesLoading) return <p className="roles-message">Loading roles...</p>;
    if (rolesError)
      return <p className="roles-message roles-error">{rolesError}</p>;
    if (roles.length === 0)
      return (
        <p className="roles-message">No roles found. Create a role first.</p>
      );

    return (
      <div className="roles-list">
        {roles.map((role) => (
          <label key={role.id} className="role-item">
            <input
              type="checkbox"
              value={role.id}
              checked={formData.roleIds.includes(role.id)}
              onChange={() => handleRoleToggle(role.id)}
            />
            <span>{role.name}</span>
          </label>
        ))}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="add-user-overlay" onMouseDown={handleClose}>
      <div className="add-user-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="add-user-header">
          <div>
            <h2>{title}</h2>
            <p>Create an 8AM platform staff account and assign its roles.</p>
          </div>

          <button
            type="button"
            className="add-user-close"
            onClick={handleClose}
          >
            <i className="bi bi-x"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="add-user-body">
            {/* ---------- Required ---------- */}
            <div className="form-section">
              <h3 className="form-section-title">User Information</h3>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="user@example.com"
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="phoneNumber">Phone Number *</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleDigitsChange}
                    placeholder="9876543210"
                    maxLength="10"
                    required
                  />
                </div>
              </div>
            </div>

            {/* ---------- Roles ---------- */}
            <div className="form-section">
              <h3 className="form-section-title">Roles *</h3>
              {renderRoles()}
            </div>

            {/* ---------- Personal ---------- */}
            <div className="form-section">
              <h3 className="form-section-title">Personal Details</h3>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="maritalStatus">Marital Status</label>
                  <select
                    id="maritalStatus"
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                  >
                    <option value="">Select status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="nationality">Nationality</label>
                  <input
                    type="text"
                    id="nationality"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    placeholder="Indian"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="joiningDate">Joining Date</label>
                  <input
                    type="date"
                    id="joiningDate"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field" />
              </div>
            </div>

            {/* ---------- Address ---------- */}
            <div className="form-section">
              <h3 className="form-section-title">Address</h3>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="addressLine1">Address Line 1</label>
                  <input
                    type="text"
                    id="addressLine1"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    placeholder="12 MG Road"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="addressLine2">Address Line 2</label>
                  <input
                    type="text"
                    id="addressLine2"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    placeholder="Block A"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Hyderabad"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Telangana"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="country">Country Code</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="IN"
                    maxLength="2"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="postalCode">Postal Code</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="500001"
                  />
                </div>
              </div>
            </div>

            {/* ---------- Emergency contact ---------- */}
            <div className="form-section">
              <h3 className="form-section-title">Emergency Contact</h3>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="emergencyName">Contact Name</label>
                  <input
                    type="text"
                    id="emergencyName"
                    name="emergencyName"
                    value={formData.emergencyName}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="emergencyRelationship">Relationship</label>
                  <input
                    type="text"
                    id="emergencyRelationship"
                    name="emergencyRelationship"
                    value={formData.emergencyRelationship}
                    onChange={handleChange}
                    placeholder="Spouse"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="emergencyPhone">Contact Phone</label>
                  <input
                    type="tel"
                    id="emergencyPhone"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleDigitsChange}
                    placeholder="9888888888"
                    maxLength="10"
                  />
                </div>
              </div>
            </div>

            {/* ---------- Bank ---------- */}
            <div className="form-section">
              <h3 className="form-section-title">Bank Details</h3>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="bankName">Bank Name</label>
                  <input
                    type="text"
                    id="bankName"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    placeholder="HDFC Bank"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="bankAccountNumber">Account Number</label>
                  <input
                    type="text"
                    id="bankAccountNumber"
                    name="bankAccountNumber"
                    value={formData.bankAccountNumber}
                    onChange={handleChange}
                    placeholder="1234567890"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="bankIfscCode">IFSC Code</label>
                  <input
                    type="text"
                    id="bankIfscCode"
                    name="bankIfscCode"
                    value={formData.bankIfscCode}
                    onChange={handleChange}
                    placeholder="HDFC0001234"
                    maxLength="11"
                  />
                </div>
              </div>
            </div>

            {/* ---------- Government ---------- */}
            <div className="form-section">
              <h3 className="form-section-title">Government Details</h3>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="panNumber">PAN Number</label>
                  <input
                    type="text"
                    id="panNumber"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleChange}
                    placeholder="ABCDE1234F"
                    maxLength="10"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="aadhaarNumber">Aadhaar Number</label>
                  <input
                    type="text"
                    id="aadhaarNumber"
                    name="aadhaarNumber"
                    value={formData.aadhaarNumber}
                    onChange={handleAadhaarChange}
                    placeholder="123456789012"
                    maxLength="12"
                  />
                </div>

                <div className="form-field" />
              </div>
            </div>

            {/* ---------- Other ---------- */}
            <div className="form-section">
              <h3 className="form-section-title">Additional Information</h3>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="skills">Skills</label>
                  <input
                    type="text"
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="scheduling, support"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="notes">Notes</label>
                  <input
                    type="text"
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Platform ops hire"
                  />
                </div>

                <div className="form-field" />
              </div>
            </div>
          </div>

          {error && <div className="add-user-error">{error}</div>}

          <div className="add-user-footer">
            <button
              type="button"
              className="modal-cancel"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="modal-save"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
