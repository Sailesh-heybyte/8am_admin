import { useState } from "react";
import "../../App.scss";
import AddSchoolModal from "./popups/AddSchoolModal.jsx";
import Dashboard from "./Dashboard/index.jsx";
import Roles from "./Roles/index.jsx";
import Users from "./Users/index.jsx";
import Schools from "./Schools/index.jsx";
import Branches from "./Branches/index.jsx";
import Devices from "./Devices/index.jsx";
import { initialRoles } from "../../utils/roleData.js";

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
    department: "Platform Operations",
    role: "Super Admin",
    access: "All",
    lastLogin: "Today, 09:14 AM",
    status: "Active",
  },
  {
    id: 2,
    name: "Sales Manager",
    email: "sales@busguard.in",
    department: "Revenue",
    role: "Sales Manager",
    access: "Limited",
    lastLogin: "Today, 08:42 AM",
    status: "Active",
  },
  {
    id: 3,
    name: "Support Executive",
    email: "support@busguard.in",
    department: "Customer Success",
    role: "Support",
    access: "Limited",
    lastLogin: "Yesterday, 06:18 PM",
    status: "Active",
  },
  {
    id: 4,
    name: "Finance Manager",
    email: "finance@busguard.in",
    department: "Finance",
    role: "Finance",
    access: "Reports",
    lastLogin: "Yesterday, 04:05 PM",
    status: "Active",
  },
  {
    id: 5,
    name: "School Viewer",
    email: "viewer@greenwood.edu.in",
    department: "School Partnerships",
    role: "Viewer",
    access: "Read Only",
    lastLogin: "Sep 01, 11:30 AM",
    status: "Active",
  },
  {
    id: 5,
    name: "School Viewer",
    email: "viewer@greenwood.edu.in",
    department: "School Partnerships",
    role: "Viewer",
    access: "Read Only",
    lastLogin: "Sep 01, 11:30 AM",
    status: "Active",
  },
  {
    id: 5,
    name: "School Viewer",
    email: "viewer@greenwood.edu.in",
    department: "School Partnerships",
    role: "Viewer",
    access: "Read Only",
    lastLogin: "Sep 01, 11:30 AM",
    status: "Active",
  },
];

const initialSchools = [
  {
    id: 1,
    schoolName: "Greenwood International School",
    schoolCode: "SCH001",
    schoolGroup: "Greenfield Education Group",
    email: "office@greenwood.edu.in",
    phone: "9876543210",
    address: "Madhapur Main Road",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500072",
    studentCount: "1,240",
    busCount: "35",
    adminName: "Anita Rao",
    adminEmail: "anita@greenwood.edu.in",
    adminPhone: "9876543211",
    status: "Active",
  },
  {
    id: 2,
    schoolName: "Delhi Public School",
    schoolCode: "SCH002",
    schoolGroup: "Delhi Public School Society",
    email: "office@dps.edu.in",
    phone: "9876543212",
    address: "Mathura Road",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110025",
    studentCount: "2,180",
    busCount: "48",
    adminName: "Rahul Mehta",
    adminEmail: "rahul@dps.edu.in",
    adminPhone: "9876543213",
    status: "Active",
  },
  {
    id: 3,
    schoolName: "St. Mary's School",
    schoolCode: "SCH003",
    schoolGroup: "Independent",
    email: "office@stmarys.edu.in",
    phone: "9876543214",
    address: "Whitefield Road",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560066",
    studentCount: "1,560",
    busCount: "32",
    adminName: "Priya Nair",
    adminEmail: "priya@stmarys.edu.in",
    adminPhone: "9876543215",
    status: "Active",
  },
  {
    id: 4,
    schoolName: "Ryan International School",
    schoolCode: "SCH004",
    schoolGroup: "Ryan International Group",
    email: "office@ryan.edu.in",
    phone: "9876543216",
    address: "Andheri East",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400069",
    studentCount: "2,320",
    busCount: "51",
    adminName: "Karan Shah",
    adminEmail: "karan@ryan.edu.in",
    adminPhone: "9876543217",
    status: "Active",
  },
  {
    id: 5,
    schoolName: "Narayana School",
    schoolCode: "SCH005",
    schoolGroup: "Narayana Education Group",
    email: "office@narayana.edu.in",
    phone: "9876543218",
    address: "Benz Circle",
    city: "Vijayawada",
    state: "Andhra Pradesh",
    pincode: "520010",
    studentCount: "1,110",
    busCount: "25",
    adminName: "Vijay Kumar",
    adminEmail: "vijay@narayana.edu.in",
    adminPhone: "9876543219",
    status: "Active",
  },
  {
    id: 6,
    schoolName: "Oakridge International School",
    schoolCode: "SCH006",
    schoolGroup: "Independent",
    email: "office@oakridge.edu.in",
    phone: "9876543220",
    address: "OMR Road",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600096",
    studentCount: "1,340",
    busCount: "28",
    adminName: "Meera Iyer",
    adminEmail: "meera@oakridge.edu.in",
    adminPhone: "9876543221",
    status: "Suspended",
  },
];

const initialBranches = [
  {
    id: 1,
    branchName: "Greenwood Jubilee Hills",
    branchCode: "BR001",
    schoolId: 1,
    email: "jubilee@greenwood.edu.in",
    phone: "9876500001",
    address: "Road No. 36",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500033",
    studentCount: "620",
    busCount: "18",
    coordinatorName: "Ravi Teja",
    coordinatorEmail: "ravi@greenwood.edu.in",
    status: "Active",
  },
  {
    id: 2,
    branchName: "DPS Vasant Kunj",
    branchCode: "BR002",
    schoolId: 2,
    email: "vasant@dps.edu.in",
    phone: "9876500002",
    address: "Sector C",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110070",
    studentCount: "840",
    busCount: "20",
    coordinatorName: "Neha Kapoor",
    coordinatorEmail: "neha@dps.edu.in",
    status: "Active",
  },
  {
    id: 3,
    branchName: "Oakridge OMR Campus",
    branchCode: "BR003",
    schoolId: 6,
    email: "omr@oakridge.edu.in",
    phone: "9876500003",
    address: "Old Mahabalipuram Road",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600096",
    studentCount: "510",
    busCount: "12",
    coordinatorName: "Arun Kumar",
    coordinatorEmail: "arun@oakridge.edu.in",
    status: "Inactive",
  },
  {
    id: 4,
    branchName: "Greenwood Jubilee Hills",
    branchCode: "BR001",
    schoolId: 1,
    email: "jubilee@greenwood.edu.in",
    phone: "9876500001",
    address: "Road No. 36",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500033",
    studentCount: "620",
    busCount: "18",
    coordinatorName: "Ravi Teja",
    coordinatorEmail: "ravi@greenwood.edu.in",
    status: "Active",
  },
  {
    id: 5,
    branchName: "DPS Vasant Kunj",
    branchCode: "BR002",
    schoolId: 2,
    email: "vasant@dps.edu.in",
    phone: "9876500002",
    address: "Sector C",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110070",
    studentCount: "840",
    busCount: "20",
    coordinatorName: "Neha Kapoor",
    coordinatorEmail: "neha@dps.edu.in",
    status: "Active",
  },
  {
    id: 6,
    branchName: "Oakridge OMR Campus",
    branchCode: "BR003",
    schoolId: 6,
    email: "omr@oakridge.edu.in",
    phone: "9876500003",
    address: "Old Mahabalipuram Road",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600096",
    studentCount: "510",
    busCount: "12",
    coordinatorName: "Arun Kumar",
    coordinatorEmail: "arun@oakridge.edu.in",
    status: "Inactive",
  },
];

const initialBuses = [
  {
    id: 1,
    busNumber: "TS 09 AB 1234",
    school: "Greenwood International",
    deviceId: 1,
  },
  {
    id: 2,
    busNumber: "DL 01 CD 5678",
    school: "Delhi Public School",
    deviceId: null,
  },
  {
    id: 3,
    busNumber: "MH 14 GH 3456",
    school: "St. Mary's School",
    deviceId: 2,
  },
];

const initialDevices = [
  {
    id: 1,
    name: "Greenwood GPS Unit",
    serialNumber: "DEV-10001",
    model: "TrackPro X2",
    manufacturer: "TrackPro",
    status: "Active",
    busId: 1,
  },
  {
    id: 2,
    name: "Fleet Tracker 02",
    serialNumber: "DEV-10002",
    model: "FleetLink M1",
    manufacturer: "FleetLink",
    status: "Active",
    busId: 3,
  },
  {
    id: 3,
    name: "Spare GPS Unit",
    serialNumber: "DEV-10003",
    model: "TrackPro X2",
    manufacturer: "TrackPro",
    status: "Maintenance",
    busId: null,
  },
  {
    id: 4,
    name: "Greenwood GPS Unit",
    serialNumber: "DEV-10001",
    model: "TrackPro X2",
    manufacturer: "TrackPro",
    status: "Active",
    busId: 1,
  },
  {
    id: 5,
    name: "Fleet Tracker 02",
    serialNumber: "DEV-10002",
    model: "FleetLink M1",
    manufacturer: "FleetLink",
    status: "Active",
    busId: 3,
  },
  {
    id: 6,
    name: "Spare GPS Unit",
    serialNumber: "DEV-10003",
    model: "TrackPro X2",
    manufacturer: "TrackPro",
    status: "Maintenance",
    busId: null,
  },
];

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAddSchool, setShowAddSchool] = useState(false);
  const [users, setUsers] = useState(initialUsers);
  const [roles, setRoles] = useState(initialRoles);
  const [schools, setSchools] = useState(initialSchools);
  const [branches, setBranches] = useState(initialBranches);
  const [buses] = useState(initialBuses);
  const [devices, setDevices] = useState(initialDevices);
  const activeMenu = menuItems.find((item) => item.id === activePage);

  const renderPage = () => {
    const pages = {
      dashboard: (
        <Dashboard
          users={users}
          roles={roles}
          schools={schools}
          branches={branches}
          devices={devices}
          onAddSchool={() => setShowAddSchool(true)}
          onViewSchools={() => setActivePage("schools")}
        />
      ),

      roles: (
        <Roles
          users={users}
          roles={roles}
          onAssignRole={(userId, role) =>
            setUsers((currentUsers) =>
              currentUsers.map((user) =>
                user.id === userId
                  ? {
                      ...user,
                      role,
                      access:
                        roles.find((item) => item.name === role)?.access ||
                        "Custom",
                    }
                  : user,
              ),
            )
          }
          onSaveRole={(role, roleId) =>
            setRoles((currentRoles) =>
              roleId
                ? currentRoles.map((item) =>
                    item.id === roleId ? { ...item, ...role } : item,
                  )
                : [
                    ...currentRoles,
                    {
                      ...role,
                      id: `${role.name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
                      access: "Custom",
                      type: "blue",
                    },
                  ],
            )
          }
        />
      ),

      users: (
        <Users
          users={users}
          roles={roles}
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

      schools: (
        <Schools
          schools={schools}
          onSaveSchool={(school, schoolId) =>
            setSchools((current) =>
              schoolId
                ? current.map((item) =>
                    item.id === schoolId ? { ...item, ...school } : item,
                  )
                : [...current, { ...school, id: Date.now(), status: "Active" }],
            )
          }
          onUpdateStatus={(schoolId, status) =>
            setSchools((current) =>
              current.map((school) =>
                school.id === schoolId ? { ...school, status } : school,
              ),
            )
          }
        />
      ),
      branches: (
        <Branches
          branches={branches}
          schools={schools}
          onSaveBranch={(branch, branchId) =>
            setBranches((current) =>
              branchId
                ? current.map((item) =>
                    item.id === branchId ? { ...item, ...branch } : item,
                  )
                : [...current, { ...branch, id: Date.now() }],
            )
          }
        />
      ),
      devices: (
        <Devices
          devices={devices}
          buses={buses}
          schools={schools}
          onSaveDevice={(device, deviceId) =>
            setDevices((current) =>
              deviceId
                ? current.map((item) =>
                    item.id === deviceId ? { ...item, ...device } : item,
                  )
                : [...current, { ...device, id: Date.now(), busId: null }],
            )
          }
          onMapDevice={(deviceId, busId) =>
            setDevices((current) =>
              current.map((device) =>
                device.id === deviceId ? { ...device, busId } : device,
              ),
            )
          }
          onUnmapDevice={(deviceId) =>
            setDevices((current) =>
              current.map((device) =>
                device.id === deviceId ? { ...device, busId: null } : device,
              ),
            )
          }
          onRemoveDevice={(deviceId) =>
            setDevices((current) =>
              current.filter((device) => device.id !== deviceId),
            )
          }
        />
      ),
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
        title="Create School"
        onSave={(school) =>
          setSchools((current) => [
            ...current,
            { ...school, id: Date.now(), status: "Active" },
          ])
        }
      />
    </div>
  );
}

export default App;
