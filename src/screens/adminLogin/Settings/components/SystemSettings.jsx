import SettingsForm from "./SettingsForm.jsx";
import FormSelect from "./FormSelect.jsx";
import ToggleRow from "./ToggleRow.jsx";

export default function SystemSettings() {
  return (
    <SettingsForm
      title="System Settings"
      description="Manage data retention and platform behavior."
    >
      <FormSelect
        label="Timezone"
        value="Asia/Kolkata (IST)"
        options={["Asia/Kolkata (IST)", "UTC"]}
      />
      <FormSelect
        label="Data retention"
        value="365 days"
        options={["90 days", "180 days", "365 days", "730 days"]}
      />
      <ToggleRow title="Maintenance mode" />
      <ToggleRow title="Allow platform diagnostics" enabled />
    </SettingsForm>
  );
}
