import StatCard from "../../../components/StatCard.jsx";
import StatusBadge from "../../../components/StatusBadge.jsx";

export default function Dashboard({
  users = [],
  roles = [],
  schools = [],
  branches = [],
  devices = [],
  onAddSchool,
  onViewSchools,
}) {
  const activeSchools = schools.filter(
    (school) => school.status === "Active",
  ).length;
  const activeUsers = users.filter((user) => user.status === "Active").length;
  const activeDevices = devices.filter(
    (device) => device.status === "Active",
  ).length;
  const mappedDevices = devices.filter((device) => device.busId).length;
  const recentActivity = [
    ...schools.slice(-2).map((school) => ({
      label: school.schoolName,
      detail: "School record",
      status: school.status,
    })),
    ...devices.slice(-2).map((device) => ({
      label: device.name,
      detail: device.busId ? "Mapped to bus" : "Awaiting bus mapping",
      status: device.status,
    })),
    ...users.slice(-1).map((user) => ({
      label: user.name,
      detail: "Platform staff account",
      status: user.status,
    })),
  ].slice(-5);

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
      <div className="platform-dashboard-grid">
        <section className="platform-panel platform-panel-large">
          <div className="platform-panel-header">
            <div>
              <h3>School Directory</h3>
              <p>Recently managed schools</p>
            </div>
            <button className="card-action" onClick={onViewSchools}>
              View all schools
            </button>
          </div>
          <div className="platform-school-list">
            {schools.slice(0, 6).map((school) => (
              <button
                className="platform-school-row"
                key={school.id}
                onClick={onViewSchools}
              >
                <span className="school-logo">
                  {school.schoolName.charAt(0)}
                </span>
                <span className="platform-school-name">
                  <strong>{school.schoolName}</strong>
                  <small>
                    {school.city}, {school.state}
                  </small>
                </span>
                <span className="platform-school-metric">
                  <strong>{school.studentCount}</strong>
                  <small>students</small>
                </span>
                <StatusBadge status={school.status} />
              </button>
            ))}
          </div>
        </section>
        <section className="platform-panel">
          <div className="platform-panel-header">
            <div>
              <h3>Platform Health</h3>
              <p>Current module status</p>
            </div>
          </div>
          <div className="health-list">
            <div>
              <i className="bi bi-shield-check"></i>
              <span>
                <strong>Roles configured</strong>
                <small>{roles.length} access roles</small>
              </span>
              <b>{roles.length}</b>
            </div>
            <div>
              <i className="bi bi-diagram-3"></i>
              <span>
                <strong>Branches active</strong>
                <small>
                  {
                    branches.filter((branch) => branch.status === "Active")
                      .length
                  }{" "}
                  of {branches.length} branches
                </small>
              </span>
              <b>
                {branches.filter((branch) => branch.status === "Active").length}
              </b>
            </div>
            <div>
              <i className="bi bi-link-45deg"></i>
              <span>
                <strong>Devices mapped</strong>
                <small>
                  {mappedDevices} of {devices.length} devices
                </small>
              </span>
              <b>{activeDevices}</b>
            </div>
            <div>
              <i className="bi bi-person-check"></i>
              <span>
                <strong>Staff accounts</strong>
                <small>{activeUsers} active accounts</small>
              </span>
              <b>{activeUsers}</b>
            </div>
          </div>
        </section>
        <section className="platform-panel">
          <div className="platform-panel-header">
            <div>
              <h3>Recent Activity</h3>
              <p>Latest platform records</p>
            </div>
          </div>
          <div className="activity-list">
            {recentActivity.map((item, index) => (
              <div className="activity-row" key={`${item.label}-${index}`}>
                <span className="activity-icon">
                  <i className="bi bi-record-circle"></i>
                </span>
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.detail}</small>
                </span>
                <StatusBadge status={item.status} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
