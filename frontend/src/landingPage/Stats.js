import React from "react";

function Stats() {
  const stats = [
    { number: "5K+", label: "Students Practicing" },
    { number: "12K+", label: "Mock Interviews Taken" },
    { number: "92%", label: "Success Improvement" },
    { number: "50+", label: "Career Domains" },
  ];

  return (
    <div className="container py-5">
      <div className="row text-center g-4">
        {stats.map((item, index) => (
          <div key={index} className="col-md-3">
            <div className="p-4 shadow-sm rounded-4 bg-white h-100">
              <h2 className="fw-bold text-primary">{item.number}</h2>
              <p className="text-muted mb-0">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stats;
