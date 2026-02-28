import React from "react";

function Testimonials() {
  const reviews = [
    {
      name: "Rahul Sharma",
      role: "Frontend Developer",
      text: "This platform helped me improve my interview confidence and skills significantly.",
    },
    {
      name: "Priya Verma",
      role: "Software Engineer",
      text: "Resume analysis and mock interviews are extremely helpful. Highly recommended!",
    },
    {
      name: "Aman Gupta",
      role: "Full Stack Developer",
      text: "The feedback system is amazing. It shows exactly where I need improvement.",
    },
  ];

  return (
    <div className="py-5" style={{ background: "#f8fafc" }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">What Our Users Say</h2>
          <p className="text-muted">
            Real experiences from students using our platform
          </p>
        </div>

        <div className="row g-4">
          {reviews.map((review, index) => (
            <div key={index} className="col-md-4">
              <div className="card border-0 shadow-sm h-100 rounded-4">
                <div className="card-body">
                  <p className="text-muted">"{review.text}"</p>

                  <h6 className="fw-bold mb-0 mt-3">{review.name}</h6>
                  <small className="text-muted">{review.role}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
