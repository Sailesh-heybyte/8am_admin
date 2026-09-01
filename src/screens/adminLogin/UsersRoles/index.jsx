import { useState } from "react";

import PageTitle from "../../../components/PageTitle.jsx";
import RoleCard from "../../../components/RoleCard.jsx";
import DataTable from "../../../components/DataTable.jsx";
import StatusBadge from "../../../components/StatusBadge.jsx";
import DeleteConfirmationModal from "../popups/DeleteConfirmationModal.jsx";
import AddUserModal from "../popups/AddUserModal.jsx";
export default function UsersRoles() {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const users = [
    ["Super Admin", "superadmin@busguard.in", "Super Admin", "All", "Active"],
    [
      "Sales Manager",
      "sales@busguard.in",
      "Sales Manager",
      "Limited",
      "Active",
    ],
    [
      "Support Executive",
      "support@busguard.in",
      "Support",
      "Limited",
      "Active",
    ],
    ["Finance Manager", "finance@busguard.in", "Finance", "Reports", "Active"],
    [
      "School Viewer",
      "viewer@greenwood.edu.in",
      "Viewer",
      "Read Only",
      "Active",
    ],
    ["Super Admin", "superadmin@busguard.in", "Super Admin", "All", "Active"],
    [
      "Sales Manager",
      "sales@busguard.in",
      "Sales Manager",
      "Limited",
      "Active",
    ],
    [
      "Support Executive",
      "support@busguard.in",
      "Support",
      "Limited",
      "Active",
    ],
    ["Finance Manager", "finance@busguard.in", "Finance", "Reports", "Active"],
    [
      "School Viewer",
      "viewer@greenwood.edu.in",
      "Viewer",
      "Read Only",
      "Active",
    ],
  ];
  return (
    <>
      <PageTitle
        title="Users & Roles"
        description="Control access to the BusGuard platform."
        button="+ Add User"
        onButtonClick={() => setIsAddUserOpen(true)}
      />
      <div className="role-cards">
        <RoleCard
          title="Super Admin"
          count="3"
          text="Full platform access"
          type="purple"
        />
        <RoleCard
          title="Sales Manager"
          count="8"
          text="Schools and subscriptions"
          type="blue"
        />
        <RoleCard
          title="Support"
          count="14"
          text="Tickets and alerts"
          type="green"
        />
        <RoleCard
          title="Viewer"
          count="22"
          text="Read-only access"
          type="orange"
        />
      </div>
      <DataTable
        headers={["User Name", "Email", "Role", "Access", "Status", "Actions"]}
        rows={users.map((u) => [
          <strong>{u[0]}</strong>,
          u[1],
          u[2],
          u[3],
          <StatusBadge status={u[4]} />,
          <div className="action-buttons">
            <button
              className="action-icon"
              title="edit"
              onClick={() => setIsAddUserOpen(true)}
            >
              <i class="bi bi-pencil"></i>
            </button>
            <button
              className="action-icon"
              title="Delete"
              onClick={() => setIsDeleteOpen(true)}
            >
              <i class="bi bi-trash3"></i>
            </button>
          </div>,
        ])}
        footer="Showing 1–5 of 47 users"
      />
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        // onConfirm={handleDelete}
        title="Are you sure?"
        message="Are you sure you want to delete this item? This action cannot be undone."
      />
      <AddUserModal
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        onSave={(user) => {
          console.log("New User:", user);
        }}
      />
    </>
  );
}
