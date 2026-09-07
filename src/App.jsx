import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./screens/adminLogin/Login/Login.jsx";
import AdminLogin from "./screens/adminLogin/index.jsx";
import Dashboard from "./screens/adminLogin/Dashboard/index.jsx";
import Schools from "./screens/adminLogin/Schools/index.jsx";
import Roles from "./screens/adminLogin/Roles/index.jsx";
import Users from "./screens/adminLogin/Users/index.jsx";
import Branches from "./screens/adminLogin/Branches/index.jsx";
import Devices from "./screens/adminLogin/Devices/index.jsx";
import RfidCards from "./screens/adminLogin/RfidCards/index.jsx";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("access_token"),
  );

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <Route
            element={<AdminLogin onLogout={() => setIsAuthenticated(false)} />}
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/schools" element={<Schools />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/users" element={<Users />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/rfid-cards" element={<RfidCards />} />
            <Route
              path="/login"
              element={<Navigate to="/dashboard" replace />}
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        ) : (
          <>
            <Route
              path="/login"
              element={
                <Login onLoginSuccess={() => setIsAuthenticated(true)} />
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
