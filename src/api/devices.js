import { apiCall } from "./client.js";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? "" : d.toLocaleDateString();
}

function toUiDevice(device = {}) {
  return {
    id: device.id,
    serialNumber: device.serial_number || "",
    busId: device.bus_id,
    isActive: Boolean(device.is_active),
    createdAt: formatDate(device.created_at),
  };
}

function toApiDevice(device = {}) {
  return {
    serial_number: device.serialNumber,
  };
}

// GET /api/v1/devices
// Note: Devices are top-level, not nested under a school.
export const getDevices = async () => {
  const data = await apiCall("/devices");
  return Array.isArray(data) ? data.map(toUiDevice) : [];
};

// POST /api/v1/devices
// Note: Devices are top-level, not nested under a school.
export const createDevice = (data) =>
  apiCall("/devices", {
    method: "POST",
    body: toApiDevice(data),
  });

