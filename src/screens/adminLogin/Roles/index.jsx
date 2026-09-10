import { useState, useEffect } from "react";
import PageTitle from "../../../components/PageTitle.jsx";
import DataTable from "../../../components/DataTable.jsx";
import RoleModal from "../popups/RoleModal.jsx";
import AccessRestricted, {
  isPermissionDenied,
} from "../../../components/AccessRestricted.jsx";
import {
  getRoles,
  getPermissions,
  createRole,
  assignPermissions,
} from "../../../api/roles.js";

export default function Roles() {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [roleToEdit, setRoleToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadRoles = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getRoles();
      setRoles(data);
    } catch (err) {
      setError(err.message || "Could not load roles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoles();
  }, []);

  const loadPermissions = async () => {
    if (permissions.length > 0) return;
    const data = await getPermissions();
    setPermissions(data);
  };

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const openCreate = async () => {
    try {
      await loadPermissions();
      setRoleToEdit(null);
      setIsModalOpen(true);
    } catch {
      alert("Could not load permissions");
    }
  };

  const openEdit = async (role) => {
    try {
      await loadPermissions();
      setRoleToEdit(role);
      setIsModalOpen(true);
    } catch {
      alert("Could not load permissions");
    }
  };

  const handleSave = async (formData) => {
    try {
      if (roleToEdit?.id) {
        await assignPermissions(roleToEdit.id, formData.permissions);
      } else {
        await createRole(formData);
      }
      await loadRoles();
      setIsModalOpen(false);
    } catch {
      alert("Could not save role");
    }
  };

  if (isPermissionDenied(error)) {
    return (
      <>
        <PageTitle
          title="Roles & Permissions"
          description="Create roles and control exactly what each team member can access."
        />
        <AccessRestricted resource="roles" onRetry={loadRoles} />
      </>
    );
  }

  return (
    <>
      <PageTitle
        title="Roles & Permissions"
        description="Create roles and control exactly what each team member can access."
        button="+ Create Role"
        onButtonClick={openCreate}
      />

      <div className="filter-card search-only">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search roles..."
        />
      </div>

      {loading ? (
        <div style={{ padding: "1.5rem", color: "#666", fontSize: "0.85rem" }}>
          Loading roles...
        </div>
      ) : error ? (
        <div
          style={{ padding: "1.5rem", color: "#d9534f", fontSize: "0.85rem" }}
        >
          {error}
        </div>
      ) : (
        <DataTable
          headers={["Role", "Type", "Actions"]}
          className="roles-table-card"
          rows={filteredRoles.map((role) => [
            <button className="table-link" onClick={() => openEdit(role)}>
              {role.name}
            </button>,
            role.is_platform_role ? "Platform" : "School",
            <div className="action-buttons">
              <button
                className="action-icon"
                title="Edit permissions"
                onClick={() => openEdit(role)}
              >
                <i className="bi bi-pencil"></i>
              </button>
            </div>,
          ])}
          withoutFilter={false}
          footer={`Showing ${filteredRoles.length} of ${roles.length} roles`}
        />
      )}

      {isModalOpen && (
        <RoleModal
          key={roleToEdit?.id || "new-role"}
          isOpen={isModalOpen}
          role={roleToEdit}
          permissions={permissions}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
}
