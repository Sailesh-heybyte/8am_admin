import { useState } from "react";

import Login from "./screens/adminLogin/Login/Login.jsx";
import AdminLogin from "./screens/adminLogin/index.jsx";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return isAuthenticated ? (
    <AdminLogin />
  ) : (
    <Login onLoginSuccess={() => setIsAuthenticated(true)} />
  );
}
