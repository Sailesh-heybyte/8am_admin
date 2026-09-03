import { useState } from "react";
import PageTitle from "../../../components/PageTitle.jsx";
import DataTable from "../../../components/DataTable.jsx";
import StatusBadge from "../../../components/StatusBadge.jsx";
import DeleteConfirmationModal from "../popups/DeleteConfirmationModal.jsx";
import DeviceModal from "../popups/DeviceModal.jsx";
import DeviceMapModal from "../popups/DeviceMapModal.jsx";

export default function Devices({
  devices,
  buses,
  schools,
  onSaveDevice,
  onMapDevice,
  onUnmapDevice,
  onRemoveDevice,
}) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);
  const [deviceToEdit, setDeviceToEdit] = useState(null);
  const [deviceToMap, setDeviceToMap] = useState(null);
  const [deviceToUnmap, setDeviceToUnmap] = useState(null);
  const [deviceToRemove, setDeviceToRemove] = useState(null);
  const filteredDevices = devices.filter(
    (device) =>
      `${device.name} ${device.serialNumber} ${device.model} ${device.manufacturer}`
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      (statusFilter === "All Status" || device.status === statusFilter),
  );
  const busFor = (device) =>
    buses.find((bus) => String(bus.id) === String(device.busId));

  return (
    <>
      <PageTitle
        title="Devices"
        description="Register tracking devices and manage their bus assignments."
        button="+ Register Device"
        onButtonClick={() => {
          setDeviceToEdit(null);
          setIsDeviceModalOpen(true);
        }}
      />
      <div className="filter-card admin-filter">
        <div className="filter-group">
          <label>Filter by Status:</label>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Maintenance</option>
          </select>
        </div>
        <input
          type="search"
          placeholder="Search devices..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <DataTable
        className="devices-table-card"
        headers={[
          "Device",
          "Serial Number",
          "Model",
          "Mapped Bus",
          "Status",
          "Actions",
        ]}
        rows={filteredDevices.map((device) => {
          const bus = busFor(device);
          return [
            <strong key={`${device.id}-name`}>{device.name}</strong>,
            device.serialNumber,
            `${device.manufacturer} ${device.model}`,
            bus ? bus.busNumber : "Unmapped",
            <StatusBadge status={device.status} />,
            <div className="action-buttons">
              <button
                className="action-icon"
                title="Edit device"
                onClick={() => {
                  setDeviceToEdit(device);
                  setIsDeviceModalOpen(true);
                }}
              >
                <i className="bi bi-pencil"></i>
              </button>
              <button
                className="action-icon"
                title="Remove device"
                onClick={() => setDeviceToRemove(device)}
              >
                <i className="bi bi-trash3"></i>
              </button>
              {bus ? (
                <button
                  className="action-icon"
                  title="Unmap device"
                  onClick={() => setDeviceToUnmap(device)}
                >
                  <i className="bi bi-link-45deg"></i>
                </button>
              ) : (
                <button
                  className="action-icon"
                  title="Map to bus"
                  onClick={() => setDeviceToMap(device)}
                >
                  <i className="bi bi-diagram-3"></i>
                </button>
              )}
            </div>,
          ];
        })}
        withoutFilter={false}
        footer={`Showing ${filteredDevices.length} of ${devices.length} devices`}
      />
      <DeviceModal
        key={deviceToEdit?.id || "new-device"}
        isOpen={isDeviceModalOpen}
        device={deviceToEdit}
        onClose={() => setIsDeviceModalOpen(false)}
        onSave={(device) => {
          onSaveDevice(device, deviceToEdit?.id);
          setIsDeviceModalOpen(false);
        }}
      />
      <DeviceMapModal
        key={deviceToMap?.id || "map-device"}
        isOpen={Boolean(deviceToMap)}
        device={deviceToMap}
        buses={buses}
        schools={schools}
        onClose={() => setDeviceToMap(null)}
        onSave={(busId) => {
          onMapDevice(deviceToMap.id, busId);
          setDeviceToMap(null);
        }}
      />
      <DeleteConfirmationModal
        isOpen={Boolean(deviceToUnmap)}
        onClose={() => setDeviceToUnmap(null)}
        onConfirm={() => {
          onUnmapDevice(deviceToUnmap.id);
          setDeviceToUnmap(null);
        }}
        title="Unmap device?"
        message="Are you sure you want to remove this device from its bus?"
        confirmLabel="Unmap Device"
      />
      <DeleteConfirmationModal
        isOpen={Boolean(deviceToRemove)}
        onClose={() => setDeviceToRemove(null)}
        onConfirm={() => {
          onRemoveDevice(deviceToRemove.id);
          setDeviceToRemove(null);
        }}
        title="Remove device?"
        message="Are you sure you want to permanently remove this device from the platform?"
        confirmLabel="Remove Device"
      />
    </>
  );
}
