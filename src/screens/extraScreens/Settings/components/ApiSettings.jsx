import SettingsForm from "./SettingsForm.jsx";
import FormInput from "./FormInput.jsx";
export default function ApiSettings() {
  return (
    <SettingsForm
      title="API Settings"
      description="Manage external integrations and access keys."
    >
      <FormInput label="API Base URL" value="https://api.busguard.in" />
      <FormInput label="WebSocket URL" value="wss://api.busguard.in/ws" />
      <FormInput label="Maps Provider" value="Google Maps" />
    </SettingsForm>
  );
}
