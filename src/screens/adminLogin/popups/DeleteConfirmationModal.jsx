import { useState } from "react";
import "./DeleteConfirmationModal.scss";

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  confirmLabel = "Delete",
}) => {
  const [error, setError] = useState("");
  const [isBusy, setIsBusy] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    if (isBusy) return;
    setError("");
    onClose?.();
  };

  const handleConfirm = async () => {
    setError("");
    setIsBusy(true);
    try {
      await onConfirm?.();
    } catch (err) {
      setError(err.message || "Failed to update status");
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <div className="delete-modal-overlay" onMouseDown={handleClose}>
      <div
        className="delete-confirmation-modal"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="delete-modal-close"
          onClick={handleClose}
          disabled={isBusy}
          aria-label="Close"
        >
          <i class="bi bi-x"></i>
        </button>

        <div className="delete-modal-content">
          <h2>{title}</h2>

          <p>{message}</p>

          {error && (
            <div className="add-user-error" role="alert">
              <i className="bi bi-exclamation-circle-fill" aria-hidden="true"></i>
              <span>{error}</span>
            </div>
          )}

          <div className="delete-modal-actions">
            <button
              type="button"
              className="delete-modal-cancel"
              onClick={handleClose}
              disabled={isBusy}
            >
              Cancel
            </button>

            <button
              type="button"
              className="delete-modal-confirm"
              onClick={handleConfirm}
              disabled={isBusy}
            >
              {isBusy ? "Updating..." : confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
