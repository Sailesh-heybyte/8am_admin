import { useState, useEffect } from "react";
import { getRole } from "../../../api/roles.js";
import "./AddUserModal.scss";

export default function RoleModal({
  isOpen,
  role,
  permissions,
  onClose,
  onSave,
}) {
  const isEditMode = Boolean(role?.id);

  const [formData, setFormData] = useState(() => ({
    name: role?.name || "",
    permissions: Array.isArray(role?.permissions)
      ? role.permissions.map((p) => (typeof p === "string" ? p : p.codename))
      : [],
  }));

  const [isLoadingRole, setIsLoadingRole] = useState(isEditMode);
  const [isSaving, setIsSaving] = useState(false);
  const [confirmEmptyWarning, setConfirmEmptyWarning] = useState(false);

  useEffect(() => {
    if (!isEditMode || !role?.id) {
      setIsLoadingRole(false);
      return;
    }

    let isMounted = true;
    setIsLoadingRole(true);

    getRole(role.id)
      .then((fullRole) => {
        if (!isMounted) return;
        const codenames = (fullRole.permissions || []).map((p) =>
          typeof p === "string" ? p : p.codename,
        );
        setFormData((current) => ({
          ...current,
          name: fullRole.name || role.name || "",
          permissions: codenames,
        }));
      })
      .catch((err) => {
        console.error("Failed to load role details:", err);
      })
      .finally(() => {
        if (isMounted) setIsLoadingRole(false);
      });

    return () => {
      isMounted = false;
    };
  }, [role?.id, isEditMode]);

  if (!isOpen) return null;

  const allSelected =
    permissions.length > 0 &&
    permissions.every((permission) =>
      formData.permissions.includes(permission.codename),
    );

  const handleToggleSelectAll = () => {
    setConfirmEmptyWarning(false);
    setFormData((current) => ({
      ...current,
      permissions: allSelected
        ? []
        : permissions.map((permission) => permission.codename),
    }));
  };

  const togglePermission = (codename) => {
    setConfirmEmptyWarning(false);
    setFormData((current) => ({
      ...current,
      permissions: current.permissions.includes(codename)
        ? current.permissions.filter((item) => item !== codename)
        : [...current.permissions, codename],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.permissions.length === 0 && !confirmEmptyWarning) {
      setConfirmEmptyWarning(true);
      return;
    }

    setIsSaving(true);
    try {
      await onSave(formData);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="add-user-overlay" onMouseDown={onClose}>
      <div
        className="add-user-modal role-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="add-user-header">
          <div>
            <h2>{isEditMode ? "Edit Permissions" : "Create Role"}</h2>
            <p>Define a clear access boundary for your team.</p>
          </div>
          <button type="button" className="add-user-close" onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="add-user-body">
            <div className="form-section">
              <h3 className="form-section-title">Role Information</h3>
              <div className="form-row">
                <div className="form-field role-description-field">
                  <label htmlFor="role-name">Role Name</label>
                  <input
                    id="role-name"
                    value={formData.name}
                    onChange={(event) =>
                      setFormData({ ...formData, name: event.target.value })
                    }
                    required
                    disabled={isEditMode}
                    readOnly={isEditMode}
                    placeholder="e.g. Branch Manager"
                  />
                  {isEditMode && (
                    <span
                      className="roles-message"
                      style={{ marginTop: "0.25rem", display: "block" }}
                    >
                      Role name cannot be changed after creation.
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="permission-heading">
                <h3 className="form-section-title">Assign Permissions</h3>
                <div className="permission-actions">
                  <button
                    type="button"
                    className="select-all-btn"
                    onClick={handleToggleSelectAll}
                    disabled={isLoadingRole}
                  >
                    {allSelected ? "Deselect All" : "Select All"}
                  </button>
                  <span>
                    {isLoadingRole
                      ? "..."
                      : `${formData.permissions.length} selected`}
                  </span>
                </div>
              </div>

              {isLoadingRole ? (
                <p className="roles-message">Loading role permissions...</p>
              ) : (
                <div className="permission-list">
                  {permissions.map((permission) => (
                    <label
                      className="permission-option"
                      key={permission.codename}
                    >
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(
                          permission.codename,
                        )}
                        onChange={() => togglePermission(permission.codename)}
                      />
                      <span>{permission.description}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {confirmEmptyWarning && (
            <div className="add-user-error">
              Warning: 0 permissions selected. Saving will remove all
              permissions from this role. Click "
              {isEditMode ? "Save Changes" : "Create Role"}" again to confirm.
            </div>
          )}

          <div className="add-user-footer">
            <button type="button" className="modal-cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="modal-save"
              disabled={isSaving || isLoadingRole}
            >
              {isSaving
                ? "Saving..."
                : isEditMode
                  ? "Save Changes"
                  : "Create Role"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
