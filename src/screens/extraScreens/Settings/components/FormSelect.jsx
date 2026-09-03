export default function FormSelect({ label, value, options }) {
  return (
    <label>
      {label}

      <select defaultValue={value}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
