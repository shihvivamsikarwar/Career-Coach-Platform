import React from "react";

function StatsCards({ stats }) {
  const data = [
    {
      title: "Interviews Taken",
      value: stats.total || 0,
      icon: "🎤",
      color: "primary",
    },
    {
      title: "Average Score",
      value: `${stats.avg || 0}%`,
      icon: "📈",
      color: "success",
    },
    {
      title: "Skill Level",
      value: stats.level || "Beginner",
      icon: "🚀",
      color: "warning",
    },
  ];

  return (
    <div className="row g-4">
      {data.map((item, index) => (
        <div key={index} className="col-md-4">
          <div className="stat-card">
            <div className="stat-icon bg-light">{item.icon}</div>

            <div>
              <h6 className="text-muted mb-1">{item.title}</h6>
              <h3 className={`fw-bold text-${item.color}`}>{item.value}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
