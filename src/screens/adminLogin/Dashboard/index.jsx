import { useOutletContext } from "react-router-dom";
import StatCard from "../../../components/StatCard.jsx";
import AccessRestricted, {
  isPermissionDenied,
} from "../../../components/AccessRestricted.jsx";

export default function Dashboard(props) {
  const context = useOutletContext() || {};
  const {
    users = [],
    schools = [],
    branches = [],
    devices = [],
    error,
    onRetry,
    onAddSchool,
  } = { ...context, ...props };

  if (isPermissionDenied(error)) {
    return (
      <>
        <div className="page-title">
          <div>
            <h2>Platform Overview</h2>
            <p>Manage your 8AM platform operations from one place.</p>
          </div>
        </div>
        <AccessRestricted resource="dashboard overview" onRetry={onRetry} />
      </>
    );
  }

  const activeSchools = schools.filter(
    (school) => school.status === "Active",
  ).length;
  const activeUsers = users.filter((user) => user.status === "Active").length;
  const mappedDevices = devices.filter((device) => device.busId).length;

  return (
    <>
      <div className="page-title">
        <div>
          <h2>Platform Overview</h2>
          <p>Manage your 8AM platform operations from one place.</p>
        </div>
        <button className="primary-button" onClick={onAddSchool}>
          + Add School
        </button>
      </div>
      <div className="stats-grid">
        <StatCard
          title="Schools"
          value={schools.length}
          footer={`${activeSchools} active`}
          icon={<i className="bi bi-building"></i>}
          type="blue"
        />
        <StatCard
          title="Branches"
          value={branches.length}
          footer="Across all schools"
          icon={<i className="bi bi-geo-alt"></i>}
          type="green"
        />
        <StatCard
          title="Platform Staff"
          value={users.length}
          footer={`${activeUsers} active`}
          icon={<i className="bi bi-people"></i>}
          type="purple"
        />
        <StatCard
          title="Devices"
          value={devices.length}
          footer={`${mappedDevices} mapped to buses`}
          icon={<i className="bi bi-tablet"></i>}
          type="red"
        />
      </div>
    </>
  );
}
