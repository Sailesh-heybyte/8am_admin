import PageTitle from "../../../components/PageTitle.jsx";
import CardHeader from "../../../components/CardHeader.jsx";
import StatusBadge from "../../../components/StatusBadge.jsx";

export default function LiveFleet() {
  const buses = [
    [
      "TS 09 AB 1234",
      "Greenwood International",
      "Rajesh Kumar",
      "40",
      "On Route",
      "2 min ago",
    ],
    [
      "DL 01 CD 5678",
      "Delhi Public School",
      "Suresh Yadav",
      "45",
      "On Route",
      "1 min ago",
    ],
    [
      "MH 14 GH 3456",
      "St. Mary's School",
      "Amit Singh",
      "35",
      "Delayed",
      "8 min ago",
    ],
    [
      "KA 01 EF 9012",
      "Ryan International",
      "Vikram Das",
      "50",
      "At School",
      "Just now",
    ],
    [
      "AP 16 TU 7890",
      "Narayana School",
      "Manoj Patel",
      "40",
      "On Route",
      "3 min ago",
    ],
    [
      "TN 04 AB 2245",
      "Oakridge International",
      "Deepak Verma",
      "42",
      "Offline",
      "25 min ago",
    ],
    [
      "TS 09 AB 1234",
      "Greenwood International",
      "Rajesh Kumar",
      "40",
      "On Route",
      "2 min ago",
    ],
    [
      "DL 01 CD 5678",
      "Delhi Public School",
      "Suresh Yadav",
      "45",
      "On Route",
      "1 min ago",
    ],
    [
      "MH 14 GH 3456",
      "St. Mary's School",
      "Amit Singh",
      "35",
      "Delayed",
      "8 min ago",
    ],
    [
      "KA 01 EF 9012",
      "Ryan International",
      "Vikram Das",
      "50",
      "At School",
      "Just now",
    ],
    [
      "AP 16 TU 7890",
      "Narayana School",
      "Manoj Patel",
      "40",
      "On Route",
      "3 min ago",
    ],
    [
      "TN 04 AB 2245",
      "Oakridge International",
      "Deepak Verma",
      "42",
      "Offline",
      "25 min ago",
    ],
  ];
  return (
    <>
      <PageTitle
        title="Live Fleet"
        description="Track BusGuard buses in real time across India."
      />
      <div className="fleet-layout">
        <div className="card fleet-list">
          <CardHeader title="All India Fleet" action="1,426 buses" />
          <div className="fleet-filter">
            <input placeholder="Search bus..." />
            <select>
              <option>All Status</option>
              <option>On Route</option>
              <option>Delayed</option>
              <option>Offline</option>
            </select>
          </div>
          <div className="fleet-listing">
            {buses.map((b) => (
              <div className="fleet-item" key={b[0]}>
                <div className="bus-small-icon">
                  {<i class="bi bi-bus-front"></i>}
                </div>
                <div>
                  <strong>{b[0]}</strong>
                  <span>{b[1]}</span>
                </div>
                <StatusBadge status={b[4]} />
              </div>
            ))}
          </div>
        </div>
        <div className="map-panel">
          <h3 className="map-title">India Live Fleet Map</h3>
          <div className="map"></div>
        </div>
      </div>
    </>
  );
}
