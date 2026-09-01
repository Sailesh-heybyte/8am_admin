import { useState } from "react";
import "./App.scss";
import AddSchoolModal from "./screens/adminLogin/popups/AddSchoolModal.jsx";
import Dashboard from "./screens/adminLogin/Dashboard/index.jsx";
import Schools from "./screens/adminLogin/Schools/index.jsx";
import SchoolGroups from "./screens/adminLogin/SchoolGroups/index.jsx";
import Buses from "./screens/adminLogin/Buses/index.jsx";
import Drivers from "./screens/adminLogin/Drivers/index.jsx";
import UsersRoles from "./screens/adminLogin/UsersRoles/index.jsx";

const menuItems = [
  {
    id: "dashboard",
    icon: <i className="bi bi-house"></i>,
    label: "Dashboard",
  },
  { id: "schools", icon: <i className="bi bi-building"></i>, label: "Schools" },
  {
    id: "school-groups",
    icon: <i className="bi bi-diagram-3"></i>,
    label: "School Groups",
  },
  { id: "buses", icon: <i className="bi bi-bus-front"></i>, label: "Buses" },
  {
    id: "drivers",
    icon: <i className="bi bi-person-badge"></i>,
    label: "Drivers",
  },
  { id: "students", icon: <i className="bi bi-people"></i>, label: "Students" },
  {
    id: "live-fleet",
    icon: <i className="bi bi-geo-alt"></i>,
    label: "Live Fleet",
  },
  {
    id: "subscriptions",
    icon: <i className="bi bi-credit-card"></i>,
    label: "Subscriptions",
  },
  {
    id: "reports",
    icon: <i className="bi bi-file-earmark-bar-graph"></i>,
    label: "Reports",
  },
  {
    id: "alerts",
    icon: <i className="bi bi-exclamation-triangle"></i>,
    label: "Alerts",
    badge: 86,
  },
  {
    id: "users-roles",
    icon: <i className="bi bi-person-gear"></i>,
    label: "Users & Roles",
  },
  {
    id: "audit-logs",
    icon: <i className="bi bi-clock-history"></i>,
    label: "Audit Logs",
  },
  { id: "settings", icon: <i className="bi bi-gear"></i>, label: "Settings" },
];

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAddSchool, setShowAddSchool] = useState(false);
  const activeMenu = menuItems.find((item) => item.id === activePage);

  const renderPage = () => {
    const pages = {
      dashboard: (
        <Dashboard
          onAddSchool={() => setShowAddSchool(true)}
          onViewSchools={() => setActivePage("schools")}
        />
      ),
      schools: <Schools onAddSchool={() => setShowAddSchool(true)} />,
      "school-groups": <SchoolGroups />,
      buses: <Buses />,
      drivers: <Drivers />,
      "users-roles": <UsersRoles />,
    };
    return pages[activePage] || <Dashboard />;
  };

  return (
    <div className="admin-app">
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="brand">
          <i className="bi bi-bus-front"></i>
          {sidebarOpen && (
            <div>
              <h2>
                Bus<span>Guard</span>
              </h2>
              <p>Super Admin</p>
            </div>
          )}
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`menu-item ${activePage === item.id ? "active" : ""}`}
              onClick={() => setActivePage(item.id)}
            >
              <span className="menu-icon">{item.icon}</span>
              {sidebarOpen && (
                <>
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="menu-badge">{item.badge}</span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        {sidebarOpen && (
          <div className="admin-profile">
            <div className="avatar">A</div>
            <div className="admin-info">
              <strong>Super Admin</strong>
              <span>admin@busguard.in</span>
            </div>
            <button className="profile-more">⋮</button>
          </div>
        )}
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="sidebar-toggle"
              onClick={() => setSidebarOpen((value) => !value)}
            >
              <i className="bi bi-list"></i>
            </button>
            <div>
              <h1>{activeMenu?.label}</h1>
              <p>BusGuard multi-school transport platform</p>
            </div>
          </div>

          <div className="topbar-right">
            <div
              className="notification-button"
              onClick={() => setActivePage("alerts")}
            >
              <i className="bi bi-bell"></i>
              <span>12</span>
            </div>
          </div>
        </header>

        <section className="page-content">{renderPage()}</section>
      </main>

      <AddSchoolModal
        isOpen={showAddSchool}
        onClose={() => setShowAddSchool(false)}
        onSave={(school) => {
          console.log("NEW SCHOOL:", school);
        }}
      />
    </div>
  );
}

export default App;
