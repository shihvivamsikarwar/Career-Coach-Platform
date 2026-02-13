import { useLocation } from "react-router-dom";

function InterviewResult() {
  const location = useLocation();
  const { score, grade, performanceMessage, feedback, domain } =
    location.state || {};

  if (!feedback) {
    return <h3>No result data available</h3>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Interview Result</h2>

      <h4>Domain: {domain}</h4>
      <div className="text-center mb-4">
        <h2 className="text-primary">Final Score: {score}%</h2>
        <h1 className="display-4 fw-bold text-warning">Grade: {grade}</h1>
        <p className="lead">{performanceMessage}</p>
      </div>

      <hr />

      {feedback.map((item, index) => (
        <div key={index} className="mb-4 p-3 border rounded">
          <h5>{item.question}</h5>
          <p>
            <strong>Score:</strong> {item.score}%
          </p>

          {item.missingConcepts.length > 0 ? (
            <p>
              <strong>Missing Concepts:</strong>{" "}
              {item.missingConcepts.join(", ")}
            </p>
          ) : (
            <p className="text-success">All key concepts covered ✅</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default InterviewResult;
