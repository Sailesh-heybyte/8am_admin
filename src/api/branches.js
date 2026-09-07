import { apiCall } from "./client.js";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? "" : d.toLocaleDateString();
}

function toUiBranch(branch = {}) {
  return {
    id: branch.id,
    schoolId: branch.school_id,
    branchName: branch.name || "",
    address: branch.address || "",
    isMainBranch: Boolean(branch.is_main_branch),
    isActive: Boolean(branch.is_active),
    createdAt: formatDate(branch.created_at),
  };
}

function toApiBranch(branch = {}) {
  return {
    name: branch.branchName,
    address: branch.address,
    is_main_branch: Boolean(branch.isMainBranch),
  };
}

function toApiBranchUpdate(branch = {}) {
  return {
    name: branch.branchName,
    address: branch.address,
    is_active: Boolean(branch.isActive),
  };
}

// GET /api/v1/tenancy/schools/{schoolId}/branches
export const getBranches = async (schoolId) => {
  const data = await apiCall(`/tenancy/schools/${schoolId}/branches`);
  return Array.isArray(data) ? data.map(toUiBranch) : [];
};

// POST /api/v1/tenancy/schools/{schoolId}/branches
export const createBranch = (schoolId, data) =>
  apiCall(`/tenancy/schools/${schoolId}/branches`, {
    method: "POST",
    body: toApiBranch(data),
  });

// PATCH /api/v1/tenancy/branches/{branchId}
// Note: This endpoint takes branchId directly and is NOT nested under /tenancy/schools/{schoolId}/branches like getBranches and createBranch.
export const updateBranch = (branchId, data) =>
  apiCall(`/tenancy/branches/${branchId}`, {
    method: "PATCH",
    body: toApiBranchUpdate(data),
  });

