import { useState } from "react";
import PageTitle from "../../../components/PageTitle.jsx";
import DataTable from "../../../components/DataTable.jsx";
import RoleCard from "../../../components/RoleCard.jsx";
import AssignRoleModal from "../popups/AssignRoleModal.jsx";
import RoleDetailsModal from "../popups/RoleDetailsModal.jsx";
import RoleModal from "../popups/RoleModal.jsx";
import { permissions } from "../../../utils/roleData.js";

export default function Roles({ users, roles, onAssignRole, onSaveRole }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [roleToEdit, setRoleToEdit] = useState(false);
  const [editorVersion, setEditorVersion] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const filteredRoles = roles.filter((role) =>
    `${role.name} ${role.description}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );
  const openRoleEditor = (role = null) => {
    setSelectedRole(null);
    setEditorVersion((version) => version + 1);
    setRoleToEdit(role || {});
  };

  return (
    <>
      <PageTitle
        title="Roles & Permissions"
        description="Create roles and control exactly what each team member can access."
        button="+ Create Role"
        onButtonClick={() => openRoleEditor()}
      />
      <div className="role-cards">
        {roles.slice(0, 4).map((role) => (
          <button
            className="role-card-button"
            key={role.id}
            onClick={() => setSelectedRole(role)}
          >
            <RoleCard
              title={role.name}
              count={users.filter((user) => user.role === role.name).length}
              text={role.description}
              type={role.type}
            />
          </button>
        ))}
      </div>

      <DataTable
        headers={["Role", "Description", "Permissions", "Users", "Actions"]}
        className="roles-table-card"
        rows={filteredRoles.map((role) => [
          <button
            className="table-link"
            key={`${role.id}-name`}
            onClick={() => setSelectedRole(role)}
          >
            {role.name}
          </button>,
          role.description,
          `${role.permissions.length} permissions`,
          users.filter((user) => user.role === role.name).length,
          <div className="action-buttons">
            <button
              className="action-icon"
              title="View role"
              onClick={() => setSelectedRole(role)}
            >
              <i className="bi bi-eye"></i>
            </button>
            <button
              className="action-icon"
              title="Edit permissions"
              onClick={() => openRoleEditor(role)}
            >
              <i className="bi bi-pencil"></i>
            </button>
          </div>,
        ])}
        withoutFilter={true}
        footer={`Showing ${filteredRoles.length} of ${roles.length} roles`}
      />

      <RoleModal
        key={`${roleToEdit.id || "new-role"}-${editorVersion}`}
        isOpen={Boolean(roleToEdit)}
        role={roleToEdit.id ? roleToEdit : null}
        permissions={permissions}
        onClose={() => setRoleToEdit(false)}
        onSave={(role) => {
          onSaveRole(role, roleToEdit.id);
          setRoleToEdit(false);
        }}
      />
      <RoleDetailsModal
        isOpen={Boolean(selectedRole)}
        role={selectedRole}
        permissions={permissions}
        onClose={() => setSelectedRole(null)}
        onEdit={() => openRoleEditor(selectedRole)}
      />
      <AssignRoleModal
        key={selectedUser?.id || "assign-user-role"}
        isOpen={Boolean(selectedUser)}
        user={selectedUser}
        roles={roles}
        onClose={() => setSelectedUser(null)}
        onSave={(role) => {
          onAssignRole(selectedUser.id, role);
          setSelectedUser(null);
        }}
      />
    </>
  );
}
