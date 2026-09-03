import { useState } from "react";
import PageTitle from "../../../components/PageTitle.jsx";
import DataTable from "../../../components/DataTable.jsx";
import StatusBadge from "../../../components/StatusBadge.jsx";
import RoleCard from "../../../components/RoleCard.jsx";
import AssignRoleModal from "../popups/AssignRoleModal.jsx";

const roleDetails = [
  {
    name: "Super Admin",
    access: "All",
    text: "Full platform access",
    type: "purple",
  },
  {
    name: "Sales Manager",
    access: "Limited",
    text: "Schools and subscriptions",
    type: "blue",
  },
  {
    name: "Support",
    access: "Limited",
    text: "Tickets and alerts",
    type: "green",
  },
  {
    name: "Finance",
    access: "Reports",
    text: "Reports and billing",
    type: "orange",
  },
  {
    name: "Viewer",
    access: "Read Only",
    text: "Read-only access",
    type: "blue",
  },
];

export default function Roles({ users, onAssignRole }) {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <>
      <PageTitle
        title="Roles"
        description="Assign access roles to users across the BusGuard platform."
      />

      <div className="role-cards">
        {roleDetails.slice(0, 4).map((role) => (
          <RoleCard
            key={role.name}
            title={role.name}
            count={users.filter((user) => user.role === role.name).length}
            text={role.text}
            type={role.type}
          />
        ))}
      </div>

      <DataTable
        headers={[
          "User Name",
          "Email",
          "Current Role",
          "Access",
          "Status",
          "Actions",
        ]}
        rows={users.map((user) => [
          <strong key={`${user.id}-name`}>{user.name}</strong>,
          user.email,
          user.role,
          user.access,
          <StatusBadge status={user.status} />,
          <button
            className="secondary-button"
            onClick={() => setSelectedUser(user)}
          >
            <i className="bi bi-person-gear"></i> Assign Role
          </button>,
        ])}
        footer={`Showing ${users.length} of ${users.length} users`}
      />

      <AssignRoleModal
        key={selectedUser?.id || "assign-role"}
        isOpen={Boolean(selectedUser)}
        user={selectedUser}
        roles={roleDetails}
        onClose={() => setSelectedUser(null)}
        onSave={(role) => {
          onAssignRole(selectedUser.id, role);
          setSelectedUser(null);
        }}
      />
    </>
  );
}
