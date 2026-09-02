import SettingsForm from "./SettingsForm.jsx";
import FormInput from "./FormInput.jsx";
import FormSelect from "./FormSelect.jsx";
import ToggleRow from "./ToggleRow.jsx";

export default function PaymentSettings() {
  return (
    <SettingsForm
      title="Payment Settings"
      description="Configure billing and subscription payments."
    >
      <FormSelect
        label="Payment Gateway"
        value="Razorpay"
        options={["Razorpay", "Stripe"]}
      />
      <FormInput label="Currency" value="INR (₹)" />
      <ToggleRow title="Automatic subscription renewal" enabled />
      <ToggleRow title="Send payment receipt automatically" enabled />
    </SettingsForm>
  );
}
