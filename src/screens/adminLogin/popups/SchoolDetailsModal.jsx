import "./AddSchoolModal.scss";

export default function SchoolDetailsModal({ school, onClose, onEdit }) {
  if (!school) return null;

  const details = [
    ["School code", school.schoolCode],
    ["School group", school.schoolGroup || "Independent"],
    ["Email", school.email || "Not provided"],
    ["Phone", school.phone || "Not provided"],
    [
      "Address",
      `${school.address || "Not provided"}, ${school.city}, ${school.state} ${school.pincode || ""}`,
    ],
    ["Students", school.studentCount || "0"],
    ["Buses", school.busCount || "0"],
    ["Administrator", school.adminName || "Not assigned"],
    ["Admin email", school.adminEmail || "Not provided"],
  ];

  return (
    <div className="add-school-overlay" onMouseDown={onClose}>
      <div
        className="add-school-modal school-details-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="add-school-header">
          <div>
            <h2>{school.schoolName}</h2>
            <p>Complete school information from the platform record.</p>
          </div>
          <button type="button" className="add-school-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="school-details-grid">
          <div className="school-detail-status">
            <span
              className={`status-dot ${school.status.toLowerCase()}`}
            ></span>
            <strong>{school.status}</strong>
            <span>Platform status</span>
          </div>
          {details.map(([label, value]) => (
            <div className="school-detail-item" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <div className="add-school-footer">
          <button type="button" className="modal-cancel" onClick={onClose}>
            Close
          </button>
          <button type="button" className="modal-save" onClick={onEdit}>
            <i className="bi bi-pencil"></i> Edit School
          </button>
        </div>
      </div>
    </div>
  );
}
