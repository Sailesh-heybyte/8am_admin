import { apiCall } from "./client.js";

export const getPermissions = async (scope = "platform") => {
  const data = await apiCall(`/iam/permissions?scope=${scope}`);
  return data.filter((permission) => permission.scope === scope);
};

export const getRoles = () => apiCall("/iam/roles");

export const getRole = (id) => apiCall(`/iam/roles/${id}`);

export const assignPermissions = (roleId, codenames) =>
  apiCall(`/iam/roles/${roleId}/permissions`, {
    method: "POST",
    body: { permission_codenames: codenames },
  });

// two calls: create the role, then attach its permissions
export const createRole = async ({ name, permissions = [] }) => {
  const role = await apiCall("/iam/roles", {
    method: "POST",
    body: { name },
  });

  if (permissions.length > 0) {
    await assignPermissions(role.id, permissions);
  }

  return role;
};