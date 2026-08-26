export default function AlertRow({ alert }) {
  return (
    <div className="alert-row">
      <span className={`alert-icon ${alert[4].toLowerCase()}`}>!</span>
      <div>
        <strong>{alert[0]}</strong>
        <span>
          {alert[1]} • {alert[2]}
        </span>
      </div>
    </div>
  );
}
