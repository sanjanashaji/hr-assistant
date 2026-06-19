import { useState } from "react";
import axios from "axios";
import { API_BASE } from "../config/api";
import {
  FaUserShield,
  FaExclamationTriangle,
  FaCheckCircle,
  FaBriefcase,
  FaStar,
  FaMoneyBillWave,
  FaClock
} from "react-icons/fa";

const RISK_COLORS = {
  High: "text-red-400",
  Medium: "text-amber-400",
  Low: "text-emerald-400"
};

const RISK_BG = {
  High: "from-red-500/20 to-red-900/10 border-red-500/30",
  Medium: "from-amber-500/20 to-amber-900/10 border-amber-500/30",
  Low: "from-emerald-500/20 to-emerald-900/10 border-emerald-500/30"
};

function Attrition() {

  const [employeeId, setEmployeeId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const predict = async () => {

    if (!employeeId.trim()) {
      setError("Please enter an employee ID.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {

      const res = await axios.get(
        `${API_BASE}/attrition/${employeeId.trim()}`
      );

      setResult(res.data);

    } catch (err) {

      setError(
        err.response?.data?.error ||
        "Unable to predict attrition. Check employee ID."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="page-panel animate-fade-in">

      <div className="mb-8">
        <h1 className="page-title">Attrition Prediction</h1>
        <p className="page-description">
          Predict employee attrition risk based on performance, tenure, salary, and workload patterns
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 max-w-xl mb-6">
        <input
          className="input-field"
          placeholder="Employee ID (e.g. EMP001)"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
        <button
          onClick={predict}
          disabled={loading}
          className="btn-primary shrink-0 bg-red-500 hover:bg-red-400 hover:shadow-red-500/25"
        >
          <FaUserShield className="text-sm" />
          {loading ? "Analyzing..." : "Predict Risk"}
        </button>
      </div>

      {error && (
        <div className="result-panel border-red-500/30 mb-6">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {result && !result.error && (

        <div className="animate-slide-up space-y-6">

          <div className={`glass rounded-2xl p-6 border bg-gradient-to-br ${RISK_BG[result.risk_level]}`}>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

              <div>
                <p className="text-sm text-slate-400">Employee</p>
                <p className="text-2xl font-bold text-white mt-1">{result.full_name}</p>
                <p className="text-sm text-slate-400 mt-1">
                  {result.employee_id} · {result.department} · {result.designation}
                </p>
              </div>

              <div className="text-center lg:text-right">
                <p className="text-sm text-slate-400">Attrition Risk</p>
                <p className={`text-4xl font-bold mt-1 ${RISK_COLORS[result.risk_level]}`}>
                  {result.risk_level}
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  Risk Score: {result.risk_score}/100
                </p>
              </div>

            </div>

            <div className="mt-6">
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    result.risk_level === "High"
                      ? "bg-red-500"
                      : result.risk_level === "Medium"
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                  }`}
                  style={{ width: `${result.risk_score}%` }}
                />
              </div>
            </div>

            <p className="text-sm text-slate-300 mt-4 flex items-start gap-2">
              <FaExclamationTriangle className="text-amber-400 shrink-0 mt-0.5" />
              {result.recommendation}
            </p>

          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

            <div className="stat-card">
              <FaStar className="text-cyan-400/60 mb-2" />
              <p className="stat-label">Rating</p>
              <p className="stat-value text-lg">{result.rating}</p>
            </div>

            <div className="stat-card">
              <FaMoneyBillWave className="text-cyan-400/60 mb-2" />
              <p className="stat-label">Salary</p>
              <p className="stat-value text-lg">₹{result.salary.toLocaleString()}</p>
            </div>

            <div className="stat-card">
              <FaBriefcase className="text-cyan-400/60 mb-2" />
              <p className="stat-label">Tenure</p>
              <p className="stat-value text-lg">{result.years_at_company} yrs</p>
            </div>

            <div className="stat-card">
              <FaClock className="text-cyan-400/60 mb-2" />
              <p className="stat-label">Overtime</p>
              <p className="stat-value text-lg">{result.overtime ? "Yes" : "No"}</p>
            </div>

          </div>

          <div>
            <h2 className="section-heading">Risk Factors</h2>
            <div className="space-y-3">
              {result.risk_factors.map((factor, idx) => (
                <div key={idx} className="list-item-card">
                  <div className="flex items-center gap-3">
                    {factor.impact > 0 ? (
                      <FaExclamationTriangle className="text-amber-400" />
                    ) : (
                      <FaCheckCircle className="text-emerald-400" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-white">{factor.factor}</p>
                      <p className="text-xs text-slate-500">{factor.detail}</p>
                    </div>
                  </div>
                  <span className={`badge ${factor.impact > 0 ? "badge-warning" : "badge-success"}`}>
                    +{factor.impact} pts
                  </span>
                </div>
              ))}
            </div>
          </div>

          {result.historical_attrition !== undefined && (
            <div className="glass rounded-xl p-4 text-sm text-slate-400">
              Historical attrition label in dataset:{" "}
              <span className={result.historical_attrition ? "text-red-400" : "text-emerald-400"}>
                {result.historical_attrition ? "Left organization" : "Retained"}
              </span>
            </div>
          )}

        </div>

      )}

    </div>

  );

}

export default Attrition;
