import SettingsForm from "./SettingsForm.jsx";
import ToggleRow from "./ToggleRow.jsx";

export default function NotificationSettings() {
  return (
    <SettingsForm
      title="Notification Settings"
      description="Choose when platform alerts are sent."
    >
      <ToggleRow title="Critical safety alerts" enabled />
      <ToggleRow title="Bus offline alerts" enabled />
      <ToggleRow title="Subscription expiry reminders" enabled />
      <ToggleRow title="Weekly platform summary" />
    </SettingsForm>
  );
}
