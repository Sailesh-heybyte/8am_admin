import { useState, useEffect } from "react";
import PageTitle from "../../../components/PageTitle.jsx";
import DataTable from "../../../components/DataTable.jsx";
import StatusBadge from "../../../components/StatusBadge.jsx";
import AddUserModal from "../popups/AddUserModal.jsx";
import AccessRestricted, {
  isPermissionDenied,
} from "../../../components/AccessRestricted.jsx";
import { createUser, getUsers } from "../../../api/users.js";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

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
  }, []);

  const getRoleDisplay = (user) => {
    if (!user?.roleIds || user.roleIds.length === 0) {
      return "-";
    }
    return user.roleIds.join(", ");
  };

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.trim().toLowerCase();
    return [user.fullName, user.email, getRoleDisplay(user)]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(search);
  });

  const handleSave = async (user) => {
    await createUser(user);
    await loadUsers();
  };

  if (isPermissionDenied(usersError)) {
    return (
      <>
        <PageTitle
          title="Platform Staff"
          description="Manage 8AM platform-level administrators and staff access."
        />
        <AccessRestricted resource="platform staff" onRetry={loadUsers} />
      </>
    );
  }

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
          headers={["Staff Member", "Email", "Role", "Status", "Created"]}
          className="users-table-card"
          rows={filteredUsers.map((user) => [
            <strong key={`${user.id}-name`}>{user.fullName}</strong>,
            user.email,
            user.roleIds && user.roleIds.length > 0 ? (
              <code
                key={`${user.id}-role`}
                className="device-serial-cell"
                title={getRoleDisplay(user)}
              >
                {getRoleDisplay(user)}
              </code>
            ) : (
              "-"
            ),
            <StatusBadge
              key={`${user.id}-status`}
              status={user.isActive ? "Active" : "Inactive"}
            />,
            user.createdAt,
          ])}
          withoutFilter={false}
          footer={`Showing ${filteredUsers.length} matching of ${users.length} users`}
        />
      )}

      <AddUserModal
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        title="Create Platform User"
        onSave={handleSave}
      />
    </>
  );
}
