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
  const [mappingFilter, setMappingFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
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

  const isFilterActive =
    query.trim() !== "" ||
    mappingFilter !== "All" ||
    statusFilter !== "All";

  const handleClear = () => {
    setQuery("");
    setMappingFilter("All");
    setStatusFilter("All");
  };

  const filteredDevices = useMemo(() => {
    const search = query.trim().toLowerCase();

    return devices.filter((device) => {
      const matchesSearch =
        search === "" ||
        (device.serialNumber || "").toLowerCase().includes(search);

      const matchesMapping =
        mappingFilter === "All" ||
        (mappingFilter === "Mapped" ? Boolean(device.busId) : !device.busId);

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Active" ? device.isActive : !device.isActive);

      return matchesSearch && matchesMapping && matchesStatus;
    });
  }, [devices, query, mappingFilter, statusFilter]);

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
        headers={[
          { label: "Serial Number", sortKey: "serialNumber" },
          "Bus",
          { label: "Status", sortKey: "isActive" },
          { label: "Created", sortKey: "createdAtIso" },
          "Actions",
        ]}
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
              className="table-action table-action-danger"
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
        sortValues={filteredDevices.map((device) => [
          device.serialNumber,
          null,
          device.isActive,
          device.createdAtIso,
          null,
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
        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end" }}>
          <div className="filter-group">
            <label>Mapping:</label>
            <select
              value={mappingFilter}
              onChange={(event) => setMappingFilter(event.target.value)}
            >
              <option value="All">All</option>
              <option value="Mapped">Mapped</option>
              <option value="Unmapped">Unmapped</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Status:</label>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {isFilterActive && (
            <button
              type="button"
              className="secondary-button"
              style={{ height: "2.3rem" }}
              onClick={handleClear}
            >
              Clear
            </button>
          )}
        </div>

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
