import "./DeleteConfirmationModal.scss";

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
}) => {
  if (!isOpen) return null;

  return (
    <div className="delete-modal-overlay" onMouseDown={onClose}>
      <div
        className="delete-confirmation-modal"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="delete-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <i class="bi bi-x"></i>
        </button>

        <div className="delete-modal-content">
          <h2>{title}</h2>

          <p>{message}</p>

          <div className="delete-modal-actions">
            <button
              type="button"
              className="delete-modal-cancel"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="button"
              className="delete-modal-confirm"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
