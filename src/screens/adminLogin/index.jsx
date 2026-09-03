import { useState } from "react";
import "../../App.scss";
import AddSchoolModal from "./popups/AddSchoolModal.jsx";
import Dashboard from "./Dashboard/index.jsx";
import Roles from "./Roles/index.jsx";
import Users from "./Users/index.jsx";
import Schools from "./Schools/index.jsx";
import Branches from "./Branches/index.jsx";
import Devices from "./Devices/index.jsx";

const menuItems = [
  {
    id: "dashboard",
    icon: <i className="bi bi-house"></i>,
    label: "Dashboard",
  },
  { id: "roles", icon: <i className="bi bi-person-gear"></i>, label: "Roles" },
  { id: "users", icon: <i className="bi bi-people"></i>, label: "Users" },
  { id: "schools", icon: <i className="bi bi-building"></i>, label: "Schools" },
  {
    id: "branches",
    icon: <i className="bi bi-geo-alt"></i>,
    label: "Branches",
  },
  { id: "devices", icon: <i className="bi bi-tablet"></i>, label: "Devices" },
];

const initialUsers = [
  {
    id: 1,
    name: "Super Admin",
    email: "superadmin@busguard.in",
    role: "Super Admin",
    access: "All",
    status: "Active",
  },
  {
    id: 2,
    name: "Sales Manager",
    email: "sales@busguard.in",
    role: "Sales Manager",
    access: "Limited",
    status: "Active",
  },
  {
    id: 3,
    name: "Support Executive",
    email: "support@busguard.in",
    role: "Support",
    access: "Limited",
    status: "Active",
  },
  {
    id: 4,
    name: "Finance Manager",
    email: "finance@busguard.in",
    role: "Finance",
    access: "Reports",
    status: "Active",
  },
  {
    id: 5,
    name: "School Viewer",
    email: "viewer@greenwood.edu.in",
    role: "Viewer",
    access: "Read Only",
    status: "Active",
  },
];

const roleAccess = {
  "Super Admin": "All",
  "Sales Manager": "Limited",
  Support: "Limited",
  Finance: "Reports",
  Viewer: "Read Only",
};

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAddSchool, setShowAddSchool] = useState(false);
  const [users, setUsers] = useState(initialUsers);
  const activeMenu = menuItems.find((item) => item.id === activePage);

  const renderPage = () => {
    const pages = {
      dashboard: (
        <Dashboard
          onAddSchool={() => setShowAddSchool(true)}
          onViewSchools={() => setActivePage("schools")}
        />
      ),

      roles: (
        <Roles
          users={users}
          onAssignRole={(userId, role) =>
            setUsers((currentUsers) =>
              currentUsers.map((user) =>
                user.id === userId
                  ? { ...user, role, access: roleAccess[role] }
                  : user,
              ),
            )
          }
        />
      ),

      users: (
        <Users
          users={users}
          onAddUser={(user) =>
            setUsers((currentUsers) => [...currentUsers, user])
          }
          onDeleteUser={(userId) =>
            setUsers((currentUsers) =>
              currentUsers.filter((user) => user.id !== userId),
            )
          }
        />
      ),

      schools: <Schools onAddSchool={() => setShowAddSchool(true)} />,
      branches: <Branches />,
      devices: <Devices />,
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
