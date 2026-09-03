import "./BranchModal.scss";

export default function BranchDetailsModal({
  branch,
  schoolName,
  onClose,
  onEdit,
}) {
  if (!branch) return null;

  const details = [
    ["Branch code", branch.branchCode],
    ["School", schoolName],
    ["Email", branch.email || "Not provided"],
    ["Phone", branch.phone || "Not provided"],
    [
      "Address",
      `${branch.address || "Not provided"}, ${branch.city}, ${branch.state} ${branch.pincode || ""}`,
    ],
    ["Students", branch.studentCount || "0"],
    ["Buses", branch.busCount || "0"],
    ["Coordinator", branch.coordinatorName || "Not assigned"],
    ["Coordinator email", branch.coordinatorEmail || "Not provided"],
  ];

  return (
    <div className="branch-overlay" onMouseDown={onClose}>
      <div
        className="branch-modal branch-details"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="branch-header">
          <div>
            <h2>{branch.branchName}</h2>
            <p>Complete branch information from the platform record.</p>
          </div>
          <button type="button" className="branch-close" onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>
        <div className="branch-detail-grid">
          <div className="branch-status">
            <span
              className={`status-dot ${branch.status.toLowerCase()}`}
            ></span>
            <strong>{branch.status}</strong>
            <span>Branch status</span>
          </div>
          {details.map(([label, value]) => (
            <div className="branch-detail-item" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <div className="branch-footer">
          <button type="button" className="modal-cancel" onClick={onClose}>
            Close
          </button>
          <button type="button" className="modal-save" onClick={onEdit}>
            <i className="bi bi-pencil"></i> Edit Branch
          </button>
        </div>
      </div>
    </div>
  );
}
