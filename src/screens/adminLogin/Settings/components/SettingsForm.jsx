export default function SettingsForm({ title, description, children }) {
  return (
    <>
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="form-grid">{children}</div>
    </>
  );
}
