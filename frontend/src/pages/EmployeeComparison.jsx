import { useState } from "react";
import axios from "axios";
import {
  FaBalanceScale,
  FaTrophy,
  FaStar,
  FaCalendarCheck,
  FaGraduationCap,
  FaClock
} from "react-icons/fa";

const API_BASE = "http://127.0.0.1:5000";

const METRIC_ICONS = {
  rating: FaStar,
  goal_completion: FaTrophy,
  training_completed: FaGraduationCap,
  present_days: FaCalendarCheck,
  absent_days: FaClock,
  late_logins: FaClock
};

function ComparisonBar({ value1, value2, higherIsBetter }) {

  const max = Math.max(value1, value2, 1);
  const pct1 = (value1 / max) * 100;
  const pct2 = (value2 / max) * 100;

  const win1 = higherIsBetter ? value1 > value2 : value1 < value2;
  const win2 = higherIsBetter ? value2 > value1 : value2 < value1;

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className={win1 ? "text-cyan-400 font-semibold" : "text-slate-400"}>
            {value1}
          </span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${win1 ? "bg-cyan-500" : "bg-slate-600"}`}
            style={{ width: `${pct1}%` }}
          />
        </div>
      </div>
      <div>
        <div className="flex justify-end text-xs mb-1">
          <span className={win2 ? "text-indigo-400 font-semibold" : "text-slate-400"}>
            {value2}
          </span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ml-auto ${win2 ? "bg-indigo-500" : "bg-slate-600"}`}
            style={{ width: `${pct2}%` }}
          />
        </div>
      </div>
    </div>
  );

}

function EmployeeComparison() {

  const [emp1, setEmp1] = useState("");
  const [emp2, setEmp2] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const compare = async () => {

    if (!emp1.trim() || !emp2.trim()) {
      setError("Please enter both employee IDs.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {

      const response = await axios.get(
        `${API_BASE}/compare/${emp1.trim()}/${emp2.trim()}`
      );

      setResult(response.data);

    } catch (err) {

      setError(
        err.response?.data?.error ||
        "Comparison failed. Please check employee IDs."
      );

    } finally {

      setLoading(false);

    }

  };

  const e1 = result?.employee_1;
  const e2 = result?.employee_2;

  return (

    <div className="page-panel animate-fade-in">

      <div className="mb-8">
        <h1 className="page-title">Employee Comparison</h1>
        <p className="page-description">
          Side-by-side performance, attendance, and training comparison
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mb-6">
        <input
          className="input-field"
          placeholder="Employee 1 (e.g. EMP001)"
          value={emp1}
          onChange={(e) => setEmp1(e.target.value)}
        />
        <input
          className="input-field"
          placeholder="Employee 2 (e.g. EMP002)"
          value={emp2}
          onChange={(e) => setEmp2(e.target.value)}
        />
        <button
          className="btn-primary shrink-0"
          onClick={compare}
          disabled={loading}
        >
          <FaBalanceScale className="text-sm" />
          {loading ? "Comparing..." : "Compare"}
        </button>
      </div>

      {error && (
        <div className="result-panel border-red-500/30 mb-6">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {result && e1 && e2 && (

        <div className="animate-slide-up space-y-6">

          {result.summary.overall_winner !== "tie" && (
            <div className="glass rounded-xl p-4 flex items-center gap-3 border border-cyan-500/20">
              <FaTrophy className="text-amber-400 text-xl" />
              <p className="text-sm text-slate-300">
                Overall better performer:{" "}
                <span className="text-cyan-400 font-semibold">
                  {result.summary.overall_winner === "employee_1"
                    ? e1.name
                    : e2.name}
                </span>
                {" "}({result.summary.overall_winner === "employee_1"
                  ? result.summary.employee_1_wins
                  : result.summary.employee_2_wins} metrics won)
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {[e1, e2].map((emp, idx) => (
              <div
                key={emp.id}
                className={`glass rounded-2xl p-5 border ${
                  idx === 0 ? "border-cyan-500/20" : "border-indigo-500/20"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${
                    idx === 0
                      ? "bg-cyan-500/15 text-cyan-400"
                      : "bg-indigo-500/15 text-indigo-400"
                  }`}>
                    {emp.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white">{emp.name}</p>
                    <p className="text-xs text-slate-400">{emp.id} · {emp.department}</p>
                  </div>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-slate-400">Designation: <span className="text-white">{emp.designation}</span></p>
                  <p className="text-slate-400">Salary Band: <span className="text-white">{emp.salary_band}</span></p>
                  <p className="text-slate-400">Joined: <span className="text-white">{emp.joining_date}</span></p>
                </div>
              </div>
            ))}

          </div>

          <div className="glass rounded-2xl p-6">
            <div className="grid grid-cols-2 gap-4 mb-6 pb-4 border-b border-slate-700/50">
              <p className="text-sm font-semibold text-cyan-400">{e1.name}</p>
              <p className="text-sm font-semibold text-indigo-400 text-right">{e2.name}</p>
            </div>

            <div className="space-y-6">
              {result.comparison.map(row => {
                const Icon = METRIC_ICONS[row.metric] || FaStar;
                return (
                  <div key={row.metric}>
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Icon className="text-slate-500 text-xs" />
                      <p className="text-sm font-medium text-slate-300">{row.label}</p>
                      {row.winner !== "tie" && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          row.winner === "employee_1"
                            ? "bg-cyan-500/15 text-cyan-400"
                            : "bg-indigo-500/15 text-indigo-400"
                        }`}>
                          {row.winner === "employee_1" ? e1.name.split(" ")[0] : e2.name.split(" ")[0]} wins
                        </span>
                      )}
                    </div>
                    <ComparisonBar
                      value1={row.employee_1_value}
                      value2={row.employee_2_value}
                      higherIsBetter={row.higher_is_better}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="stat-card text-center">
              <p className="stat-label">Employee 1 Wins</p>
              <p className="stat-value text-cyan-400">{result.summary.employee_1_wins}</p>
            </div>
            <div className="stat-card text-center">
              <p className="stat-label">Ties</p>
              <p className="stat-value text-slate-400">{result.summary.ties}</p>
            </div>
            <div className="stat-card text-center">
              <p className="stat-label">Employee 2 Wins</p>
              <p className="stat-value text-indigo-400">{result.summary.employee_2_wins}</p>
            </div>
          </div>

        </div>

      )}

    </div>

  );

}

export default EmployeeComparison;
