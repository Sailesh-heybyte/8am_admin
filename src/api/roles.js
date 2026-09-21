import { apiCall } from "./client.js";

function toApiRole(data) {
  return {
    name: data.name,
    permission_codenames: data.permissions,
  };
}

function toApiRolePermissions(permissions) {
  return {
    permission_codenames: permissions,
  };
}

export const getPermissions = async (scope = "platform") => {
  const data = await apiCall(`/iam/permissions?scope=${scope}`);
  return data.filter((permission) => permission.scope === scope);
};

export const getRoles = () => apiCall("/iam/roles");

export const getRole = (id) => apiCall(`/iam/roles/${id}`);

export const createRole = (data) =>
  apiCall("/iam/roles", {
    method: "POST",
    body: toApiRole(data),
  });

export const updateRolePermissions = (roleId, permissions) =>
  apiCall(`/iam/roles/${roleId}/permissions`, {
    method: "PUT",
    body: toApiRolePermissions(permissions),
  });

