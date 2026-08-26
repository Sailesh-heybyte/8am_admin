export default function IndiaMap({ large = false }) {
  return (
    <div className={`india-map ${large ? "large" : ""}`}>
      <div className="map-legend">
        <span>
          <i className="green-dot" /> On Route
        </span>
        <span>
          <i className="purple-dot" /> At School
        </span>
        <span>
          <i className="orange-dot" /> Delayed
        </span>
        <span>
          <i className="red-dot" /> Offline
        </span>
      </div>
    </div>
  );
}
