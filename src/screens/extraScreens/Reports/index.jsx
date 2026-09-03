import PageTitle from "../../../components/PageTitle.jsx";
import StatCard from "../../../components/StatCard.jsx";
import CardHeader from "../../../components/CardHeader.jsx";

export default function Reports() {
  const tripData = [
    { date: "May 1", trips: 420 },
    { date: "May 4", trips: 580 },
    { date: "May 7", trips: 520 },
    { date: "May 10", trips: 760 },
    { date: "May 14", trips: 680 },
    { date: "May 17", trips: 840 },
    { date: "May 21", trips: 720 },
    { date: "May 23", trips: 900 },
    { date: "May 26", trips: 820 },
    { date: "May 30", trips: 960 },
  ];
  return (
    <>
      <PageTitle
        title="Reports"
        description="Platform-wide performance, attendance and transport analytics."
      />
      <div className="stats-grid four">
        <StatCard
          title="Completed Trips"
          value="3,240"
          footer="+12.4%"
          icon={<i className="bi bi-check-circle"></i>}
          type="green"
        />
        <StatCard
          title="Students Served"
          value="12,450"
          footer="+8.2%"
          icon={<i className="bi bi-people"></i>}
          type="blue"
        />
        <StatCard
          title="On-Time Rate"
          value="92.6%"
          footer="+4.4%"
          icon={<i className="bi bi-clock"></i>}
          type="purple"
        />
        <StatCard
          title="Safety Alerts"
          value="14"
          footer="-10.5%"
          icon={<i className="bi bi-exclamation-triangle"></i>}
          type="red"
        />
      </div>

      <div className="reports-dashboard">
        <div className="report-large">
          <div className="trips-overview-header">
            <h2>Trips Overview</h2>
            <p>This Month</p>
          </div>
          <div className="line-chart">
            {tripData.map((item) => (
              <div
                key={item.date}
                className="chart-bar"
                style={{ height: `${item.trips / 10}%` }}
              >
                <span>{item.trips}</span>
              </div>
            ))}
          </div>

          <div className="chart-axis">
            {tripData.map((item) => (
              <span key={item.date}>{item.date}</span>
            ))}
          </div>
        </div>

        <div className="top-schools">
          <h3>Top Schools by Trips</h3>
          <div className="rank-list">
            {[
              ["DPS Delhi", "620"],
              ["Ryan Mumbai", "542"],
              ["Greenwood Hyderabad", "490"],
              ["St. Mary's Bengaluru", "392"],
              ["Narayana AP", "310"],
              ["DPS Delhi", "620"],
              ["Ryan Mumbai", "542"],
              ["Greenwood Hyderabad", "490"],
              ["St. Mary's Bengaluru", "392"],
              ["Narayana AP", "310"],
              ["DPS Delhi", "620"],
              ["Ryan Mumbai", "542"],
              ["Greenwood Hyderabad", "490"],
              ["St. Mary's Bengaluru", "392"],
              ["Narayana AP", "310"],
            ].map((item, i) => (
              <div className="rank-row" key={item[0]}>
                <span className="rank">{i + 1}</span>
                <strong>{item[0]}</strong>
                <b>{item[1]}</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
