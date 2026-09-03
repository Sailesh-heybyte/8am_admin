import "./AddUserModal.scss";

export default function RoleDetailsModal({
  isOpen,
  role,
  permissions,
  onClose,
  onEdit,
}) {
  if (!isOpen || !role) return null;

  const assignedPermissions = permissions.filter((permission) =>
    role.permissions.includes(permission.id),
  );

  return (
    <div className="add-user-overlay" onMouseDown={onClose}>
      <div
        className="add-user-modal role-details-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="add-user-header">
          <div>
            <h2>{role.name}</h2>
            <p>{role.description}</p>
          </div>
          <button type="button" className="add-user-close" onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>
        <div className="add-user-body">
          <div className="role-detail-summary">
            <span className={`role-detail-dot ${role.type}`}></span>
            <div>
              <strong>{role.access} access</strong>
              <span>{assignedPermissions.length} permissions assigned</span>
            </div>
          </div>
          <div className="form-section">
            <h3 className="form-section-title">Assigned Permissions</h3>
            <div className="assigned-permissions">
              {assignedPermissions.length ? (
                assignedPermissions.map((permission) => (
                  <span key={permission.id}>
                    <i className="bi bi-check2"></i>
                    {permission.name}
                  </span>
                ))
              ) : (
                <p>No permissions assigned.</p>
              )}
            </div>
          </div>
        </div>
        <div className="add-user-footer">
          <button type="button" className="modal-cancel" onClick={onClose}>
            Close
          </button>
          <button type="button" className="modal-save" onClick={onEdit}>
            <i className="bi bi-pencil"></i> Edit Permissions
          </button>
        </div>
      </div>
    </div>
  );
}
