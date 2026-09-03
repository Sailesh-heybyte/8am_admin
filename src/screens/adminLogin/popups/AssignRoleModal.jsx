import { useState } from "react";
import "./AddUserModal.scss";

export default function AssignRoleModal({
  isOpen,
  user,
  roles,
  onClose,
  onSave,
}) {
  const [role, setRole] = useState(user?.role || "");

  if (!isOpen || !user) return null;

  return (
    <div className="add-user-overlay" onMouseDown={onClose}>
      <div
        className="add-user-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="add-user-header">
          <div>
            <h2>Assign Role</h2>
            <p>Choose the access role for {user.name}.</p>
          </div>
          <button type="button" className="add-user-close" onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSave(role);
          }}
        >
          <div className="add-user-body">
            <div className="form-section">
              <h3 className="form-section-title">Role & Access</h3>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="assign-role">User Role</label>
                  <select
                    id="assign-role"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                    required
                  >
                    {roles.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
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
              Save Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
