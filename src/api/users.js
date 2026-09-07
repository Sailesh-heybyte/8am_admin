import { apiCall } from "./client.js";

function parseSkills(skills) {
  if (typeof skills === "string") {
    return skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
  }
  if (Array.isArray(skills)) {
    return skills;
  }
  return [];
}

function hasValue(val) {
  if (val === undefined || val === null) return false;
  if (typeof val === "string" && val.trim() === "") return false;
  return true;
}

function buildCleanObject(fields) {
  const cleanObj = {};
  for (const [key, value] of Object.entries(fields)) {
    if (hasValue(value)) {
      cleanObj[key] = typeof value === "string" ? value.trim() : value;
    }
  }
  return Object.keys(cleanObj).length > 0 ? cleanObj : undefined;
}

function toApiUser(uiUser = {}) {
  // Always send required fields (and skills array)
  const body = {
    full_name: uiUser.fullName?.trim() || "",
    email: uiUser.email?.trim() || "",
    phone_number: uiUser.phoneNumber?.trim() || "",
    role_ids: Array.isArray(uiUser.roleIds) ? uiUser.roleIds : [],
    skills: parseSkills(uiUser.skills),
  };

  // Optional top-level fields: omit if empty
  if (hasValue(uiUser.dateOfBirth)) body.date_of_birth = uiUser.dateOfBirth.trim();
  if (hasValue(uiUser.gender)) body.gender = uiUser.gender.trim();
  if (hasValue(uiUser.maritalStatus)) body.marital_status = uiUser.maritalStatus.trim();
  if (hasValue(uiUser.nationality)) body.nationality = uiUser.nationality.trim();
  if (hasValue(uiUser.joiningDate)) body.joining_date = uiUser.joiningDate.trim();
  if (hasValue(uiUser.notes)) body.notes = uiUser.notes.trim();

  // Nested objects: omit individual empty fields and omit whole object if empty
  const address = buildCleanObject({
    address_line_1: uiUser.addressLine1,
    address_line_2: uiUser.addressLine2,
    city: uiUser.city,
    state: uiUser.state,
    country: uiUser.country,
    postal_code: uiUser.postalCode,
  });
  if (address) body.address = address;

  const emergencyContact = buildCleanObject({
    emergency_contact_name: uiUser.emergencyName,
    emergency_contact_relationship: uiUser.emergencyRelationship,
    emergency_contact_phone: uiUser.emergencyPhone,
  });
  if (emergencyContact) body.emergency_contact = emergencyContact;

  const bankDetails = buildCleanObject({
    bank_name: uiUser.bankName,
    bank_account_number: uiUser.bankAccountNumber,
    bank_ifsc_code: uiUser.bankIfscCode,
  });
  if (bankDetails) body.bank_details = bankDetails;

  const governmentDetails = buildCleanObject({
    pan_number: uiUser.panNumber,
    aadhaar_number: uiUser.aadhaarNumber,
  });
  if (governmentDetails) body.government_details = governmentDetails;

  return body;
}

// POST /api/v1/iam/platform-users
export async function createUser(uiUser) {
  return apiCall("/iam/platform-users", {
    method: "POST",
    body: toApiUser(uiUser),
  });
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? "" : d.toLocaleDateString();
}

function toUiUser(apiUser = {}) {
  return {
    id: apiUser.id || "",
    username: apiUser.username || "",
    fullName: apiUser.full_name || "",
    email: apiUser.email || "",
    phoneNumber: apiUser.phone_number || "",
    isActive: Boolean(apiUser.is_active),
    roleIds: apiUser.role_ids || [],
    createdAt: formatDate(apiUser.created_at),
  };
}

// GET /api/v1/iam/platform-users
export async function getUsers() {
  const res = await apiCall("/iam/platform-users");
  return Array.isArray(res) ? res.map(toUiUser) : [];
}

