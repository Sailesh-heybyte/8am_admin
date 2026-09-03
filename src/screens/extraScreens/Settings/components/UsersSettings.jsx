import SettingsForm from "./SettingsForm.jsx";
import ToggleRow from "./ToggleRow.jsx";
export default function UsersSettings() {
  return (
    <SettingsForm
      title="Users & Roles"
      description="Configure platform access policies."
    >
      <ToggleRow title="Require two-factor authentication" />
      <ToggleRow title="Allow role-based permissions" />
      <ToggleRow title="Require approval for new admin users" />
    </SettingsForm>
  );
}
