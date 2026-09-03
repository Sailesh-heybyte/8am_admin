import StatusBadge from "../../../components/StatusBadge.jsx";

export default function SchoolDetails({
  school,
  onBack,
  onEdit,
  onStatusChange,
}) {
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
    ["Admin phone", school.adminPhone || "Not provided"],
  ];

  return (
    <div className="school-detail-page">
      <button type="button" className="back-button" onClick={onBack}>
        <i className="bi bi-arrow-left"></i> Back to Schools
      </button>
      <div className="school-detail-hero">
        <div className="school-detail-identity">
          <div className="school-detail-logo">
            {school.schoolName.charAt(0)}
          </div>
          <div>
            <span>School profile</span>
            <h2>{school.schoolName}</h2>
            <p>
              {school.city}, {school.state}
            </p>
          </div>
        </div>
        <div className="school-detail-actions">
          <StatusBadge status={school.status} />
          <button className="secondary-button" onClick={onEdit}>
            <i className="bi bi-pencil"></i> Edit School
          </button>
          <button className="primary-button" onClick={onStatusChange}>
            <i
              className={
                school.status === "Active"
                  ? "bi bi-pause-circle"
                  : "bi bi-play-circle"
              }
            ></i>{" "}
            {school.status === "Active" ? "Suspend" : "Reactivate"}
          </button>
        </div>
      </div>
      <div className="school-detail-content">
        <div className="school-detail-section">
          <div className="detail-section-heading">
            <h3>School Information</h3>
            <span>{school.schoolCode}</span>
          </div>
          <div className="school-detail-fields">
            {details.map(([label, value]) => (
              <div className="school-detail-field" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="school-detail-section school-detail-metrics">
          <h3>At a glance</h3>
          <div>
            <div>
              <i className="bi bi-mortarboard"></i>
              <strong>{school.studentCount}</strong>
              <span>Students</span>
            </div>
            <div>
              <i className="bi bi-bus-front"></i>
              <strong>{school.busCount}</strong>
              <span>Active buses</span>
            </div>
            <div>
              <i className="bi bi-shield-check"></i>
              <strong>{school.status}</strong>
              <span>Account status</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
