import SettingsForm from "./SettingsForm.jsx";
import FormInput from "./FormInput.jsx";
export default function SmsSettings() {
  return (
    <SettingsForm
      title="SMS / Email Settings"
      description="Configure communication providers."
    >
      <FormInput label="SMS Provider" value="MSG91" />
      <FormInput label="Sender ID" value="BUSGRD" />
      <FormInput label="Email Provider" value="Amazon SES" />
      <FormInput label="From Email" value="notifications@busguard.in" />
    </SettingsForm>
  );
}
