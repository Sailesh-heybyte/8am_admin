import { useState } from "react";
import "./AddSchoolModal.scss";

const emptyFormData = {
  schoolName: "",
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
  const isEditing = Boolean(initialData);

  const [formData, setFormData] = useState({
    ...emptyFormData,
    ...initialData,
  });
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumericChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, "").slice(0, 10);

    setFormData((prev) => ({
      ...prev,
      [name]: numericValue,
    }));
  };

  const handleClose = () => {
    if (isSaving) return;
    setError("");
    onClose?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEditing && formData.adminPhone.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    setError("");
    setIsSaving(true);

    try {
      await onSave?.(formData);
      onClose();
      setFormData(emptyFormData);
    } catch (err) {
      setError(err.message || "Failed to save school");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="add-school-overlay" onMouseDown={handleClose}>
      <div
        className="add-school-modal"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="add-school-header">
          <div>
            <h2>{title}</h2>
            <p>
              {isEditing
                ? "Update the school's details."
                : "Add a new school to the 8AM platform."}
            </p>
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

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="add-school-body">
            {/* School Information */}
            <div className="form-section">
              <div className="form-section-title">
                <h3>School Information</h3>
              </div>

              <div className="form-row">
                <div className="form-field full">
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
              </div>
            </div>

            {/* School Admin - only when creating */}
            {!isEditing && (
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
                      required
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
                      required
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
                      required
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="add-user-error" role="alert">
              <i className="bi bi-exclamation-circle-fill" aria-hidden="true"></i>
              <span>{error}</span>
            </div>
          )}

          {/* Footer */}
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
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : title}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSchoolModal;
