import { useState } from "react";

export default function ToggleRow({ title, enabled = false }) {
  const [checked, setChecked] = useState(enabled);
  return (
    <div className="toggle-row">
      <span>{title}</span>
      <button
        type="button"
        className={`toggle ${checked ? "on" : ""}`}
        onClick={() => setChecked((value) => !value)}
      >
        <span />
      </button>
    </div>
  );
}
