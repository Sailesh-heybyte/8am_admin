export const permissions = [
  { id: "dashboard.view", name: "View dashboard", group: "Dashboard" },
  { id: "schools.view", name: "View schools", group: "Schools" },
  { id: "schools.manage", name: "Create and manage schools", group: "Schools" },
  { id: "users.view", name: "View users", group: "Users" },
  { id: "users.manage", name: "Create and manage users", group: "Users" },
  { id: "roles.manage", name: "Create and manage roles", group: "Users" },
  { id: "buses.view", name: "View buses", group: "Transport" },
  { id: "buses.manage", name: "Manage buses and drivers", group: "Transport" },
  { id: "reports.view", name: "View reports", group: "Reports" },
  {
    id: "settings.manage",
    name: "Manage platform settings",
    group: "Settings",
  },
];

export const initialRoles = [
  {
    id: "super-admin",
    name: "Super Admin",
    description: "Full platform access",
    access: "All",
    type: "purple",
    permissions: permissions.map((permission) => permission.id),
  },
  {
    id: "sales-manager",
    name: "Sales Manager",
    description: "Schools and subscriptions",
    access: "Limited",
    type: "blue",
    permissions: [
      "dashboard.view",
      "schools.view",
      "schools.manage",
      "reports.view",
    ],
  },
  {
    id: "support",
    name: "Support",
    description: "Tickets and alerts",
    access: "Limited",
    type: "green",
    permissions: ["dashboard.view", "schools.view", "users.view", "buses.view"],
  },
  {
    id: "finance",
    name: "Finance",
    description: "Reports and billing",
    access: "Reports",
    type: "orange",
    permissions: ["dashboard.view", "reports.view"],
  },
  {
    id: "viewer",
    name: "Viewer",
    description: "Read-only access",
    access: "Read Only",
    type: "blue",
    permissions: [
      "dashboard.view",
      "schools.view",
      "buses.view",
      "reports.view",
    ],
  },
];
