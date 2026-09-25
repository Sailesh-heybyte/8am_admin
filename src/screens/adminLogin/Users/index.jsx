import { useState, useEffect } from "react";
import PageTitle from "../../../components/PageTitle.jsx";
import DataTable from "../../../components/DataTable.jsx";
import StatusBadge from "../../../components/StatusBadge.jsx";
import TypeAhead from "../../../components/TypeAhead.jsx";
import AddUserModal from "../popups/AddUserModal.jsx";
import AccessRestricted from "../../../components/AccessRestricted.jsx";
import { isPermissionDenied } from "../../../utils/errors.js";
import { createUser, getUsers } from "../../../api/users.js";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
      setUsersError(null);
    } catch (err) {
      setUsersError(err);
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const getRoleDisplay = (user) => {
    if (!user.roleNames || user.roleNames.length === 0) {
      return "—";
    }
    return user.roleNames.join(", ");
  };

  const roleOptions = [
    ...new Set(users.flatMap((user) => user.roleNames)),
  ].sort((a, b) => a.localeCompare(b));

  const isFilterActive =
    searchTerm.trim() !== "" ||
    roleFilter !== "" ||
    statusFilter !== "";

  const handleClear = () => {
    setSearchTerm("");
    setRoleFilter("");
    setStatusFilter("");
  };

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.trim().toLowerCase();
    const matchesSearch =
      search === "" ||
      [user.fullName, user.email, getRoleDisplay(user)]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(search);

    const matchesRole =
      roleFilter === "" || user.roleNames.includes(roleFilter);

    const matchesStatus =
      statusFilter === "" ||
      (statusFilter === "Active" ? user.isActive : !user.isActive);

    return matchesSearch && matchesRole && matchesStatus;
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
        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end" }}>
          <div className="filter-group">
            <label>Role:</label>
            <TypeAhead
              options={roleOptions.map((role) => ({ value: role, label: role }))}
              value={roleFilter}
              onChange={setRoleFilter}
              placeholder="All roles"
              emptyMessage="No roles available"
              noMatchMessage="No roles found"
            />
          </div>

          <div className="filter-group">
            <label>Status:</label>
            <TypeAhead
              options={[
                { value: "Active", label: "Active" },
                { value: "Inactive", label: "Inactive" },
              ]}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="All"
              noMatchMessage="No statuses found"
            />
          </div>

          {isFilterActive && (
            <button
              type="button"
              className="secondary-button"
              style={{ height: "2.3rem" }}
              onClick={handleClear}
            >
              Clear
            </button>
          )}
        </div>

        <input
          type="search"
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
          {usersError.message}
        </div>
      ) : (
        <DataTable
          headers={[
            { label: "Staff Member", sortKey: "fullName" },
            { label: "Email", sortKey: "email" },
            { label: "Role", sortKey: "roleNames" },
            { label: "Status", sortKey: "isActive" },
            { label: "Created", sortKey: "createdAtIso" },
          ]}
          className="users-table-card"
          rows={filteredUsers.map((user) => [
            <strong key={`${user.id}-name`}>{user.fullName}</strong>,
            user.email,
            getRoleDisplay(user),
            <StatusBadge
              key={`${user.id}-status`}
              status={user.isActive ? "Active" : "Inactive"}
            />,
            user.createdAt,
          ])}
          sortValues={filteredUsers.map((user) => [
            user.fullName,
            user.email,
            user.roleNames.join(", "),
            user.isActive,
            user.createdAtIso,
          ])}
          withoutFilter={false}
          footer={`Showing ${filteredUsers.length} matching of ${users.length} users`}
        />
      )}

      {isAddUserOpen && (
        <AddUserModal
          isOpen={isAddUserOpen}
          onClose={() => setIsAddUserOpen(false)}
          title="Create Platform User"
          onSave={handleSave}
        />
      )}
    </>
  );
}
