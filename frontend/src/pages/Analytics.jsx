import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUsers,
  FaStar,
  FaBuilding,
  FaChartLine
} from "react-icons/fa";

const API_BASE = "http://127.0.0.1:5000";

function Analytics() {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    axios
      .get(`${API_BASE}/analytics`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load analytics. Please ensure the backend is running.");
        setLoading(false);
      });

  }, []);

  if (loading) {

    return (
      <div className="page-panel">
        <div className="loading-state">
          <div className="w-5 h-5 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
          Loading analytics...
        </div>
      </div>
    );

  }

  if (error) {

    return (
      <div className="page-panel">
        <div className="loading-state text-red-400">
          {error}
        </div>
      </div>
    );

  }

  return (

    <div className="page-panel animate-fade-in">

      <div className="mb-8">
        <h1 className="page-title">
          HR Analytics
        </h1>
        <p className="page-description">
          Overview of workforce metrics and performance indicators
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="stat-label">Total Employees</p>
            <FaUsers className="text-cyan-400/60" />
          </div>
          <p className="stat-value">{data.total_employees}</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="stat-label">Average Rating</p>
            <FaStar className="text-cyan-400/60" />
          </div>
          <p className="stat-value">{data.avg_rating}</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="stat-label">Departments</p>
            <FaBuilding className="text-cyan-400/60" />
          </div>
          <p className="stat-value">{data.total_departments}</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="stat-label">Highest Rating</p>
            <FaChartLine className="text-cyan-400/60" />
          </div>
          <p className="stat-value">{data.highest_rated}</p>
        </div>

      </div>

      <div className="mt-10">

        <h2 className="section-heading">
          Department Headcount
        </h2>

        <div className="space-y-3">

          {data.department_breakdown?.map(item => (

            <div key={item.department} className="glass rounded-xl p-4">

              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white">
                  {item.department}
                </span>
                <span className="badge-info">
                  {item.count} employees
                </span>
              </div>

              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-500 rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>

              <p className="text-xs text-slate-500 mt-1.5">
                {item.percentage}% of workforce
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default Analytics;
