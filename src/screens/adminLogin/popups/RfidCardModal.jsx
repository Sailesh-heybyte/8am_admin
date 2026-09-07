import { useState } from "react";
import "./DeviceModal.scss";

export default function RfidCardModal({ isOpen, onClose, onSave }) {
  const [cardNumber, setCardNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleClose = () => {
    setCardNumber("");
    setError("");
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await onSave({ cardNumber: cardNumber.trim() });
      setCardNumber("");
    } catch (err) {
      setError(err.message || "Failed to register card.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="device-overlay" onMouseDown={handleClose}>
      <div
        className="device-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="device-header">
          <div>
            <h2>Register RFID Card</h2>
            <p>Add an RFID card to the 8AM inventory.</p>
          </div>
          <button className="device-close" type="button" onClick={handleClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="device-body">
            <div className="device-fields">
              <label>
                Card Number
                <input
                  name="cardNumber"
                  value={cardNumber}
                  onChange={(event) => setCardNumber(event.target.value)}
                  placeholder="RFID-005"
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
              {isSubmitting ? "Registering..." : "Register Card"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
