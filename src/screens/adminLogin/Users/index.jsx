import { useState } from "react";
import PageTitle from "../../../components/PageTitle.jsx";
import DataTable from "../../../components/DataTable.jsx";
import StatusBadge from "../../../components/StatusBadge.jsx";
import DeleteConfirmationModal from "../popups/DeleteConfirmationModal.jsx";
import AddUserModal from "../popups/AddUserModal.jsx";

export default function Users({ users, roles, onAddUser, onDeleteUser }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.trim().toLowerCase();
    const matchesSearch = [
      user.name,
      user.email,
      user.role,
      user.access,
      user.department,
      user.lastLogin,
    ]
      .join(" ")
      .includes(search);

    return (
      matchesSearch &&
      (statusFilter === "All Status" || user.status === statusFilter)
    );
  });

  const handleSave = (user) => {
    onAddUser({ ...user, id: Date.now(), lastLogin: "Never" });
    setIsAddUserOpen(false);
  };

  return (
    <>
      <PageTitle
        title="Platform Staff"
        description="Manage 8AM platform-level administrators and staff access."
        button="+ Create Platform User"
        onButtonClick={() => setIsAddUserOpen(true)}
      />

      <div className="filter-card admin-filter">
        <div style={{ display: "flex", gap: "1rem" }}>
          <div className="filter-group">
            <label>Filter by Status:</label>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <DataTable
        headers={[
          "Staff Member",
          "Email",
          "Department",
          "Role",
          "Last Login",
          "Status",
          "Actions",
        ]}
        className="users-table-card"
        rows={filteredUsers.map((user) => [
          <strong key={`${user.id}-name`}>{user.name}</strong>,
          user.email,
          user.department,
          user.role,
          user.lastLogin,
          <StatusBadge status={user.status} />,
          <div className="action-buttons">
            <button
              className="action-icon"
              title="Delete"
              onClick={() => setUserToDelete(user)}
            >
              <i className="bi bi-trash3"></i>
            </button>
          </div>,
        ])}
        withoutFilter={false}
        footer={`Showing ${filteredUsers.length} matching of ${users.length} users`}
      />

      <DeleteConfirmationModal
        isOpen={Boolean(userToDelete)}
        onClose={() => setUserToDelete(null)}
        onConfirm={() => {
          onDeleteUser(userToDelete.id);
          setUserToDelete(null);
        }}
        title="Delete user?"
        message="Are you sure you want to delete this user? This action cannot be undone."
      />

      <AddUserModal
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        roles={roles}
        title="Create Platform User"
        onSave={handleSave}
      />
    </>
  );
}
