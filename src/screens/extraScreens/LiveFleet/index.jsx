import { useState } from "react";

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
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const filteredBuses = buses.filter((bus) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      bus[0].toLowerCase().includes(search) ||
      bus[1].toLowerCase().includes(search) ||
      bus[2].toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All Status" || bus[4] === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <PageTitle
        title="Live Fleet"
        description="Track BusGuard buses in real time across India."
      />

      <div className="fleet-layout">
        <div className="card fleet-list">
          <CardHeader
            title="All India Fleet"
            action={`${filteredBuses.length} buses`}
          />

          <div className="fleet-filter">
            <input
              type="text"
              placeholder="Search bus, school or driver..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option>All Status</option>
              <option>On Route</option>
              <option>Delayed</option>
              <option>At School</option>
              <option>Offline</option>
            </select>
          </div>

          <div className="fleet-listing">
            {filteredBuses.length > 0 ? (
              filteredBuses.map((bus, index) => (
                <div
                  className="fleet-item"
                  key={`${bus[0]}-${bus[1]}-${index}`}
                >
                  <div className="bus-small-icon">
                    <i className="bi bi-bus-front"></i>
                  </div>

                  <div className="fleet-info">
                    <strong>{bus[0]}</strong>
                    <span>{bus[1]}</span>
                  </div>

                  <StatusBadge status={bus[4]} />
                </div>
              ))
            ) : (
              <div className="no-fleet-data">
                <i className="bi bi-search"></i>
                <p>No buses found.</p>
              </div>
            )}
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
