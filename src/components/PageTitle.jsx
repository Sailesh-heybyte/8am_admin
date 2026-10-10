export default function PageTitle({
  title,
  description,
  button,
  onButtonClick,
  buttonDisabled,
}) {
  return (
    <div className="page-title">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {button && (
        <button className="primary-button" onClick={onButtonClick} disabled={buttonDisabled}>
          {button}
        </button>
      )}
    </div>
  );
}
