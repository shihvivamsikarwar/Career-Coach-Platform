import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-indigo-600">
          🚀 AI Career Coach
        </h1>

        <div className="space-x-4">
          <Link
            to="/login"
            className="px-5 py-2 rounded-lg border border-indigo-500 text-indigo-600"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white shadow"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="flex flex-col items-center text-center py-24 px-6">
        <h2 className="text-5xl font-bold text-gray-800 leading-tight max-w-3xl">
          Crack Interviews Faster with
          <span className="text-indigo-600"> AI Career Coach</span>
        </h2>

        <p className="mt-6 text-gray-600 text-lg max-w-2xl">
          Practice interviews, analyze your resume, and get personalized career
          guidance powered by artificial intelligence.
        </p>

        <div className="mt-8 space-x-4">
          <Link
            to="/register"
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl shadow-lg"
          >
            Get Started Free
          </Link>

          <Link to="/login" className="px-8 py-3 border rounded-xl">
            Login
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-8 px-10 pb-20">
        <FeatureCard
          title="AI Resume Analysis"
          desc="Upload your resume and get ATS score, strengths, and improvement tips."
        />

        <FeatureCard
          title="Mock Interviews"
          desc="Practice real interview questions with AI evaluation and feedback."
        />

        <FeatureCard
          title="Career Guidance"
          desc="Personalized learning roadmap and career recommendations."
        />
      </section>
    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-indigo-600">{title}</h3>
      <p className="mt-3 text-gray-600">{desc}</p>
    </div>
  );
}
