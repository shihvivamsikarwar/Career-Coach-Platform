import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import API from "../../utils/api";

function SkillRadarChart() {
  const [data, setData] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchSkillData();
  }, []);

  const fetchSkillData = async () => {
    try {
      const res = await axios.get(`${API}/api/dashboard/${userId}`);

      const skills = res.data.skillBreakdown || {};

      const formatted = [
        { skill: "Technical", value: skills.technical || 40 },
        { skill: "Communication", value: skills.communication || 30 },
        { skill: "Problem Solving", value: skills.problemSolving || 35 },
        { skill: "Confidence", value: skills.confidence || 25 },
        { skill: "Structure", value: skills.structure || 30 },
      ];

      setData(formatted);
    } catch (err) {
      console.error("Skill data error", err);
    }
  };

  return (
    <div className="card shadow-sm border-0 p-4 h-100">
      <h5 className="mb-3">Skill Radar Analysis</h5>

      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="skill" />
          <PolarRadiusAxis />
          <Radar dataKey="value" />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SkillRadarChart;
