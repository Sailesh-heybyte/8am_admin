import { useState } from "react";
import PageTitle from "../../../components/PageTitle.jsx";
import PlatformSettings from "./components/PlatformSettings.jsx";
import UsersSettings from "./components/UsersSettings.jsx";
import NotificationSettings from "./components/NotificationSettings.jsx";
import SmsSettings from "./components/SmsSettings.jsx";
import PaymentSettings from "./components/PaymentSettings.jsx";
import SystemSettings from "./components/SystemSettings.jsx";
import ApiSettings from "./components/ApiSettings.jsx";

export default function Settings() {
  const [tab, setTab] = useState("platform");

  const tabs = [
    ["platform", "Platform Settings"],
    ["users", "Users & Roles"],
    ["notifications", "Notification Settings"],
    ["sms", "SMS / Email Settings"],
    ["payments", "Payment Settings"],
    ["system", "System Settings"],
    ["api", "API Settings"],
  ];

  return (
    <>
      <PageTitle
        title="Platform Overview"
        description="Monitor schools, fleet, students and safety across India."
        button="Save Changes"
        onButtonClick={() => console.log("Save Changes clicked")}
      />

      <div className="settings-layout">
        <div className="settings-menu">
          {tabs.map(([id, label]) => (
            <button
              key={id}
              className={tab === id ? "settings-active" : ""}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className=" settings-form">
          {tab === "platform" && <PlatformSettings />}
          {tab === "users" && <UsersSettings />}
          {tab === "notifications" && <NotificationSettings />}
          {tab === "sms" && <SmsSettings />}
          {tab === "payments" && <PaymentSettings />}
          {tab === "system" && <SystemSettings />}
          {tab === "api" && <ApiSettings />}
        </div>
      </div>
    </>
  );
}
