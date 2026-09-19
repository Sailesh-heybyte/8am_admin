import { apiCall } from "./client.js";
import { formatDate } from "../utils/formatDate.js";

function toUiDevice(device = {}) {
  return {
    id: device.id,
    serialNumber: device.serial_number || "",
    busId: device.bus_id,
    registrationNumber: device.registration_number,
    isActive: Boolean(device.is_active),
    createdAt: formatDate(device.created_at),
    createdAtIso: device.created_at,
  };
}

function toApiDevice(device = {}) {
  return {
    serial_number: device.serialNumber,
  };
}

export const getDevices = async () => {
  const data = await apiCall("/devices");
  return Array.isArray(data) ? data.map(toUiDevice) : [];
};

export const createDevice = (data) =>
  apiCall("/devices", {
    method: "POST",
    body: toApiDevice(data),
  });

export const mapDeviceToBus = (deviceId, busId) =>
  apiCall(`/devices/${deviceId}/map-to-bus`, {
    method: "POST",
    body: { bus_id: busId },
  });

export const unmapDevice = (deviceId) =>
  apiCall(`/devices/${deviceId}/unmap`, {
    method: "POST",
  });
