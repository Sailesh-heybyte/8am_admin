export default function FormInput({ label, value }) {
  return (
    <label>
      {label}
      <input defaultValue={value} />
    </label>
  );
}
