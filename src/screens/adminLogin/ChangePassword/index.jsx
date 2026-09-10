import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import "../Login/Login.scss";
import { changePassword, login } from "../../../api/auth.js";

export default function ChangePassword({ onPasswordChanged }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [temporaryPassword, setTemporaryPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showTemporary, setShowTemporary] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!localStorage.getItem("access_token")) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!temporaryPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    if (newPassword === temporaryPassword) {
      setError("New password must be different from the temporary password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await changePassword(temporaryPassword, newPassword);

      if (data?.access_token) {
        localStorage.setItem("access_token", data.access_token);
        if (data?.refresh_token) {
          localStorage.setItem("refresh_token", data.refresh_token);
        }
        onPasswordChanged?.();
        navigate("/dashboard");
        return;
      }

      const identifier =
        location.state?.identifier ||
        sessionStorage.getItem("admin_login_identifier");

      if (!identifier) {
        navigate("/login");
        return;
      }

      await login(identifier, newPassword);
      sessionStorage.removeItem("admin_login_identifier");
      onPasswordChanged?.();
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Could not change password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <aside className="login-hero">
        <div className="brand-mark">
          <i className="bi bi-bus-front"></i>
        </div>
        <div className="hero-copy">
          <h1>8AM</h1>
          <p>
            Set a permanent password for your platform administrator account to
            continue to the dashboard.
          </p>
        </div>

        <div className="hero-stats">
          <div>
            <strong>Step 1</strong>
            <span>Set new password</span>
          </div>
          <div>
            <strong>Step 2</strong>
            <span>Secure account</span>
          </div>
          <div>
            <strong>Step 3</strong>
            <span>Access dashboard</span>
          </div>
        </div>
      </aside>

      <section className="login-panel">
        <div className="login-card">
          <div className="login-header">
            <p className="eyebrow">One-time setup</p>
            <h2>Change Password</h2>
            <p>Replace your temporary password to continue.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="field-group">
              <label htmlFor="temporaryPassword">Temporary Password</label>
              <div className="input-shell">
                <input
                  id="temporaryPassword"
                  type={showTemporary ? "text" : "password"}
                  value={temporaryPassword}
                  onChange={(e) => setTemporaryPassword(e.target.value)}
                  placeholder="Enter temporary password"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowTemporary(!showTemporary)}
                  aria-label={
                    showTemporary
                      ? "Hide temporary password"
                      : "Show temporary password"
                  }
                >
                  <i
                    className={`bi ${showTemporary ? "bi-eye-slash" : "bi-eye"}`}
                  ></i>
                </button>
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="newPassword">New Password</label>
              <div className="input-shell">
                <input
                  id="newPassword"
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowNew(!showNew)}
                  aria-label={showNew ? "Hide password" : "Show password"}
                >
                  <i className={`bi ${showNew ? "bi-eye-slash" : "bi-eye"}`}></i>
                </button>
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <div className="input-shell">
                <input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirm(!showConfirm)}
                  aria-label={
                    showConfirm
                      ? "Hide confirmed password"
                      : "Show confirmed password"
                  }
                >
                  <i
                    className={`bi ${showConfirm ? "bi-eye-slash" : "bi-eye"}`}
                  ></i>
                </button>
              </div>
            </div>

            {error && <small className="field-error">{error}</small>}

            <div className="action-row">
              <button
                type="submit"
                className="primary-button full-width"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Changing password..." : "Change Password"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
