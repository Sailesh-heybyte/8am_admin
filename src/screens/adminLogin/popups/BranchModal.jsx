import { useState } from "react";
import "./BranchModal.scss";

export default function BranchModal({
  isOpen,
  branch,
  schoolName,
  onClose,
  onSave,
}) {
  const isEditing = Boolean(branch);

  const [formData, setFormData] = useState({
    branchName: branch?.branchName || "",
    address: branch?.address || "",
    isMainBranch: branch?.isMainBranch || false,
    isActive: branch?.isActive ?? true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await onSave(formData);
    } catch (err) {
      setError(err.message || "Failed to save branch. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="branch-overlay" onMouseDown={onClose}>
      <div
        className="branch-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="branch-header">
          <div>
            <h2>{isEditing ? "Update Branch" : "Create Branch"}</h2>
            <p>
              {isEditing
                ? "Update this branch's details."
                : `Add a new branch to ${schoolName}.`}
            </p>
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
                <label className="branch-wide">
                  Branch Name
                  <input
                    name="branchName"
                    value={formData.branchName}
                    onChange={handleChange}
                    placeholder="e.g. Main Campus"
                    required
                  />
                </label>

                <label className="branch-wide">
                  Address
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="1 Northwood Rd, Hyderabad"
                  />
                </label>
              </div>
            </div>

            <div className="branch-section">
              {isEditing ? (
                <label className="branch-toggle">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                  />
                  <span>
                    <strong>Active</strong>
                    <em>
                      Uncheck to deactivate this branch. It stays in the system
                      but is marked inactive.
                    </em>
                  </span>
                </label>
              ) : (
                <label className="branch-toggle">
                  <input
                    type="checkbox"
                    name="isMainBranch"
                    checked={formData.isMainBranch}
                    onChange={handleChange}
                  />
                  <span>
                    <strong>Main branch</strong>
                    <em>
                      Mark this as the school's primary branch. This cannot be
                      changed later.
                    </em>
                  </span>
                </label>
              )}
            </div>
          </div>

          {error && <div className="branch-error-box">{error}</div>}

          <div className="branch-footer">
            <button
              type="button"
              className="modal-cancel"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="modal-save"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : isEditing
                  ? "Save Changes"
                  : "Create Branch"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
