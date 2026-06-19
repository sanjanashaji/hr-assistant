import { useState } from "react";
import axios from "axios";
import {
  FaArrowUp,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch
} from "react-icons/fa";

const API_BASE = "http://127.0.0.1:5000";

function Promotion() {

  const [employeeId, setEmployeeId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkPromotion = async () => {

    if (!employeeId.trim()) {
      setError("Please enter an employee ID.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {

      const response = await axios.get(
        `${API_BASE}/promotion/${employeeId}`
      );

      setResult(response.data);

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        "Unable to check promotion eligibility. Please verify the employee ID."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="page-panel animate-fade-in">

      <div className="mb-8">
        <h1 className="page-title">
          Promotion Eligibility
        </h1>
        <p className="page-description">
          Check whether an employee meets the criteria for promotion
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 max-w-xl">

        <input
          className="input-field"
          placeholder="Employee ID (e.g. EMP001)"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />

        <button
          onClick={checkPromotion}
          disabled={loading}
          className="btn-primary shrink-0"
        >
          <FaArrowUp className="text-sm" />
          {loading ? "Checking..." : "Check"}
        </button>

      </div>

      {error && (
        <div className="result-panel mt-4 border-red-500/30">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {result && (

        <div className="result-panel animate-slide-up">

          <div className="flex items-center justify-between mb-6">
            <h3 className="section-heading mb-0">
              Eligibility Result
            </h3>
            {result.eligible ? (
              <span className="badge-success">
                <FaCheckCircle className="mr-1" />
                Eligible
              </span>
            ) : (
              <span className="badge-warning">
                <FaTimesCircle className="mr-1" />
                Not Eligible
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div className="glass rounded-xl p-4">
              <p className="stat-label">Employee ID</p>
              <p className="text-base font-semibold text-white mt-1.5">
                {result.employee_id}
              </p>
            </div>

            <div className="glass rounded-xl p-4">
              <p className="stat-label">Eligible</p>
              <p className="text-base font-semibold text-white mt-1.5">
                {String(result.eligible)}
              </p>
            </div>

            <div className="glass rounded-xl p-4">
              <p className="stat-label">Designation</p>
              <p className="text-base font-semibold text-white mt-1.5">
                {result.designation}
              </p>
            </div>

          </div>

        </div>

      )}

    </div>

  );

}

export default Promotion;
