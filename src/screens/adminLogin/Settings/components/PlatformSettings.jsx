import SettingsForm from "./SettingsForm.jsx";
import FormInput from "./FormInput.jsx";
import FormSelect from "./FormSelect.jsx";

export default function PlatformSettings() {
  return (
    <SettingsForm
      title="Platform Settings"
      description="Manage global BusGuard configuration."
    >
      <FormInput label="Platform Name" value="BusGuard" />
      <FormInput label="Support Email" value="support@busguard.in" />
      <FormInput label="Support Phone" value="1800 123 4547" />
      <FormInput label="Default Address" value="Hyderabad, Telangana, India" />
      <FormSelect
        label="Default Country"
        value="India"
        options={["India", "United Arab Emirates", "Singapore"]}
      />
    </SettingsForm>
  );
}
