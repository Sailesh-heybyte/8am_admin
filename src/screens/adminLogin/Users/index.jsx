import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import PageTitle from "../../../components/PageTitle.jsx";
import DataTable from "../../../components/DataTable.jsx";
import StatusBadge from "../../../components/StatusBadge.jsx";
import DeleteConfirmationModal from "../popups/DeleteConfirmationModal.jsx";
import AddUserModal from "../popups/AddUserModal.jsx";
import { createUser, getUsers } from "../../../api/users.js";
import { getRoles } from "../../../api/roles.js";

export default function Users(props) {
  const context = useOutletContext() || {};
  const { onDeleteUser } = { ...context, ...props };

  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState("");

  const [roles, setRoles] = useState([]);
  const [rolesLoading, setRolesLoading] = useState(true);
  const [rolesError, setRolesError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
      setUsersError("");
    } catch (err) {
      setUsersError(err.message || "Failed to load users.");
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
    getRoles()
      .then((data) => {
        setRoles(data);
      })
      .catch((err) => {
        setRolesError(err.message || "Failed to load roles.");
      })
      .finally(() => {
        setRolesLoading(false);
      });
  }, []);

  const getRoleNames = (user) => {
    if (!user?.roleIds || user.roleIds.length === 0) {
      return "-";
    }
    const names = user.roleIds.map((id) => {
      const foundRole = roles.find((r) => r.id === id);
      return foundRole ? foundRole.name : id;
    });
    return names.join(", ");
  };

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.trim().toLowerCase();
    return [user.fullName, user.email, getRoleNames(user)]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(search);
  });

  const handleSave = async (user) => {
    await createUser(user);
    await loadUsers();
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
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      {usersLoading ? (
        <div style={{ padding: "1.5rem", color: "#666", fontSize: "0.85rem" }}>
          Loading users...
        </div>
      ) : usersError ? (
        <div
          style={{ padding: "1.5rem", color: "#d9534f", fontSize: "0.85rem" }}
        >
          {usersError}
        </div>
      ) : (
        <DataTable
          headers={[
            "Staff Member",
            "Email",
            "Role",
            "Status",
            "Created",
            "Actions",
          ]}
          className="users-table-card"
          rows={filteredUsers.map((user) => [
            <strong key={`${user.id}-name`}>{user.fullName}</strong>,
            user.email,
            getRoleNames(user),
            <StatusBadge
              key={`${user.id}-status`}
              status={user.isActive ? "Active" : "Inactive"}
            />,
            user.createdAt,
            <div className="action-buttons" key={`${user.id}-actions`}>
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
      )}

      <DeleteConfirmationModal
        isOpen={Boolean(userToDelete)}
        onClose={() => setUserToDelete(null)}
        onConfirm={() => {
          onDeleteUser?.(userToDelete.id);
          setUserToDelete(null);
        }}
        title="Delete user?"
        message="Are you sure you want to delete this user? This action cannot be undone."
      />

      <AddUserModal
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        roles={roles}
        rolesLoading={rolesLoading}
        rolesError={rolesError}
        title="Create Platform User"
        onSave={handleSave}
      />
    </>
  );
}
