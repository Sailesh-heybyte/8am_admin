import { useState } from "react";
import "./DeviceModal.scss";

export default function DeviceModal({ isOpen, onClose, onSave }) {
  const [serialNumber, setSerialNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleClose = () => {
    if (isSubmitting) return;
    setSerialNumber("");
    setError("");
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await onSave({ serialNumber: serialNumber.trim() });
      setSerialNumber("");
    } catch (err) {
      setError(err.message || "Failed to register device.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="device-overlay">
      <div
        className="device-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="device-header">
          <div>
            <h2>Register Device</h2>
            <p>Add a tracking device to the 8AM inventory.</p>
          </div>
          <button className="device-close" type="button" onClick={handleClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="device-body">
            <div className="device-fields">
              <label>
                Serial Number
                <input
                  name="serialNumber"
                  value={serialNumber}
                  onChange={(event) => setSerialNumber(event.target.value)}
                  placeholder="DEVICE-001"
                  required
                  autoFocus
                />
              </label>
            </div>
          </div>

          {error && <div className="device-error-box">{error}</div>}

          <div className="device-footer">
            <button
              type="button"
              className="modal-cancel"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="modal-save"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register Device"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
