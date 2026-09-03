import { useState } from "react";
import "./AddUserModal.scss";

export default function RoleModal({
  isOpen,
  role,
  permissions,
  onClose,
  onSave,
}) {
  const [formData, setFormData] = useState(() => ({
    name: role?.name || "",
    description: role?.description || "",
    permissions: role?.permissions || [],
  }));

  if (!isOpen) return null;

  const togglePermission = (permissionId) => {
    setFormData((current) => ({
      ...current,
      permissions: current.permissions.includes(permissionId)
        ? current.permissions.filter((id) => id !== permissionId)
        : [...current.permissions, permissionId],
    }));
  };

  const groupedPermissions = permissions.reduce((groups, permission) => {
    groups[permission.group] = [
      ...(groups[permission.group] || []),
      permission,
    ];
    return groups;
  }, {});

  return (
    <div className="add-user-overlay" onMouseDown={onClose}>
      <div
        className="add-user-modal role-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="add-user-header">
          <div>
            <h2>{role ? "Edit Role" : "Create Role"}</h2>
            <p>Define a clear access boundary for your team.</p>
          </div>
          <button type="button" className="add-user-close" onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSave(formData);
          }}
        >
          <div className="add-user-body">
            <div className="form-section">
              <h3 className="form-section-title">Role Information</h3>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="role-name">Role Name</label>
                  <input
                    id="role-name"
                    value={formData.name}
                    onChange={(event) =>
                      setFormData({ ...formData, name: event.target.value })
                    }
                    required
                    placeholder="e.g. Branch Manager"
                  />
                </div>
                <div className="form-field role-description-field">
                  <label htmlFor="role-description">Description</label>
                  <input
                    id="role-description"
                    value={formData.description}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        description: event.target.value,
                      })
                    }
                    required
                    placeholder="What can this role do?"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="permission-heading">
                <h3 className="form-section-title">Assign Permissions</h3>
                <span>{formData.permissions.length} selected</span>
              </div>
              <div className="permission-grid">
                {Object.entries(groupedPermissions).map(
                  ([group, groupPermissions]) => (
                    <fieldset key={group} className="permission-group">
                      <legend>{group}</legend>
                      {groupPermissions.map((permission) => (
                        <label
                          className="permission-option"
                          key={permission.id}
                        >
                          <input
                            type="checkbox"
                            checked={formData.permissions.includes(
                              permission.id,
                            )}
                            onChange={() => togglePermission(permission.id)}
                          />
                          <span>{permission.name}</span>
                        </label>
                      ))}
                    </fieldset>
                  ),
                )}
              </div>
            </div>
          </div>
          <div className="add-user-footer">
            <button type="button" className="modal-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-save">
              {role ? "Save Changes" : "Create Role"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
