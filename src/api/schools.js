import { apiCall } from "./client.js";

// backend shape  ->  UI shape
function toUiSchool(school) {
  return {
    id: school.id,
    schoolName: school.name || "",
    schoolCode: school.slug || "",
    status: school.status === "active" ? "Active" : "Suspended",
  };
}

function makeSlug(name) {
  return (name || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function toApiSchool(school) {
  return {
    name: school.schoolName,
    slug: makeSlug(school.schoolName),
    admin: {
      full_name: school.adminName,
      email: school.adminEmail,
      phone_number: school.adminPhone,
    },
  };
}

function toApiSchoolUpdate(school) {
  return {
    name: school.schoolName,
  };
}

export const getSchools = async () => {
  const data = await apiCall("/tenancy/schools");
  return data.map(toUiSchool);
};

export const createSchool = (data) =>
  apiCall("/tenancy/schools", { method: "POST", body: toApiSchool(data) });

export const updateSchool = (id, data) =>
  apiCall(`/tenancy/schools/${id}`, {
    method: "PATCH",
    body: toApiSchoolUpdate(data),
  });

export const suspendSchool = (id) =>
  apiCall(`/tenancy/schools/${id}/suspend`, { method: "POST" });

export const reactivateSchool = (id) =>
  apiCall(`/tenancy/schools/${id}/reactivate`, { method: "POST" });
