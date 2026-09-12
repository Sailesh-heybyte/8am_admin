import { useEffect, useMemo, useState } from "react";
import PageTitle from "../../../components/PageTitle.jsx";
import DataTable from "../../../components/DataTable.jsx";
import StatusBadge from "../../../components/StatusBadge.jsx";
import DeviceModal from "../popups/DeviceModal.jsx";
import DeviceMapModal from "../popups/DeviceMapModal.jsx";
import DeleteConfirmationModal from "../popups/DeleteConfirmationModal.jsx";
import AccessRestricted, {
  isPermissionDenied,
} from "../../../components/AccessRestricted.jsx";
import {
  getDevices,
  createDevice,
  mapDeviceToBus,
  unmapDevice,
} from "../../../api/devices.js";

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);
  const [deviceToMap, setDeviceToMap] = useState(null);
  const [deviceToUnmap, setDeviceToUnmap] = useState(null);

  // GET /devices
  const loadDevices = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getDevices();
      setDevices(data);
    } catch (err) {
      setError(err.message || "Failed to load devices.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDevices();
  }, []);

  const handleSaveDevice = async (device) => {
    await createDevice(device);
    await loadDevices();
  };

  const handleMapDevice = async (busId) => {
    await mapDeviceToBus(deviceToMap.id, busId);
    await loadDevices();
    setDeviceToMap(null);
  };

  const handleUnmapDevice = async () => {
    await unmapDevice(deviceToUnmap.id);
    await loadDevices();
    setDeviceToUnmap(null);
  };

  const filteredDevices = useMemo(
    () =>
      devices.filter((device) =>
        (device.serialNumber || "").toLowerCase().includes(query.toLowerCase()),
      ),
    [devices, query],
  );

  const renderTable = () => {
    if (loading) {
      return (
        <div className="branch-empty-card">
          <p>Loading devices...</p>
        </div>
      );
    }

    if (devices.length === 0) {
      return (
        <div className="branch-empty-card">
          <i className="bi bi-cpu"></i>
          <h3>No devices yet</h3>
          <p>Register a tracking device to add it to the platform inventory.</p>
          <button
            className="branch-empty-action"
            onClick={() => setIsDeviceModalOpen(true)}
          >
            + Register the first device
          </button>
        </div>
      );
    }

    return (
      <DataTable
        className="devices-table-card"
        headers={["Serial Number", "Bus", "Status", "Created", "Actions"]}
        rows={filteredDevices.map((device) => [
          <code key={`${device.id}-serial`} className="device-serial-cell">
            {device.serialNumber}
          </code>,
          device.busId ? (
            <code key={`${device.id}-bus`} className="device-bus-id">
              {device.busId}
            </code>
          ) : (
            <span key={`${device.id}-bus`} className="device-unassigned">
              Not mapped
            </span>
          ),
          <StatusBadge
            key={`${device.id}-status`}
            status={device.isActive ? "Active" : "Inactive"}
          />,
          device.createdAt || "-",
          device.busId ? (
            <button
              key={`${device.id}-action`}
              type="button"
              className="table-action"
              onClick={() => setDeviceToUnmap(device)}
            >
              Unmap
            </button>
          ) : (
            <button
              key={`${device.id}-action`}
              type="button"
              className="table-action"
              onClick={() => setDeviceToMap(device)}
            >
              Map to Bus
            </button>
          ),
        ])}
        withoutFilter={false}
        footer={`Showing ${filteredDevices.length} of ${devices.length} devices`}
      />
    );
  };

  if (isPermissionDenied(error)) {
    return (
      <>
        <PageTitle
          title="Devices"
          description="Register tracking devices and manage their bus assignments."
        />
        <AccessRestricted resource="devices" onRetry={loadDevices} />
      </>
    );
  }

  return (
    <>
      <PageTitle
        title="Devices"
        description="Register tracking devices and manage their bus assignments."
        button="+ Register Device"
        onButtonClick={() => setIsDeviceModalOpen(true)}
      />

      <div className="filter-card admin-filter">
        <input
          type="search"
          placeholder="Search by serial number..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      {error && <p className="branch-error">{error}</p>}

      {renderTable()}

      <DeviceModal
        isOpen={isDeviceModalOpen}
        onClose={() => setIsDeviceModalOpen(false)}
        onSave={async (device) => {
          await handleSaveDevice(device);
          setIsDeviceModalOpen(false);
        }}
      />

      <DeviceMapModal
        key={deviceToMap?.id || "none"}
        isOpen={Boolean(deviceToMap)}
        device={deviceToMap}
        onClose={() => setDeviceToMap(null)}
        onMap={handleMapDevice}
      />

      <DeleteConfirmationModal
        isOpen={Boolean(deviceToUnmap)}
        onClose={() => setDeviceToUnmap(null)}
        onConfirm={handleUnmapDevice}
        title="Unmap device?"
        message={`Are you sure you want to unmap ${deviceToUnmap?.serialNumber}? It will be disconnected from its bus.`}
        confirmLabel="Unmap"
      />
    </>
  );
}
