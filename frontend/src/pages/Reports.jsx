import { useState } from "react";
import axios from "axios";
import {
  FaFileAlt,
  FaDownload,
  FaFilePdf,
  FaFileExcel,
  FaCheckCircle
} from "react-icons/fa";

const API_BASE = "http://127.0.0.1:5000";

function Reports() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [report, setReport] = useState(null);

  const generateReport = async () => {

    setLoading(true);
    setError(null);

    try {

      const response = await axios.get(
        `${API_BASE}/generate-report`
      );

      setReport(response.data);

    } catch (err) {

      console.error(err);

      setError(
        "Failed to generate report. Please ensure the backend is running."
      );

    } finally {

      setLoading(false);

    }

  };

  const downloadFile = (type) => {

    window.open(
      `${API_BASE}/download-report/${type}`,
      "_blank"
    );

  };

  const summary = report?.summary;

  return (

    <div className="page-panel animate-fade-in">

      <div className="flex flex-col items-center text-center py-6">

        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
          <FaFileAlt className="text-2xl text-cyan-400" />
        </div>

        <h1 className="page-title text-3xl">
          HR Report Generator
        </h1>

        <p className="page-description max-w-lg mt-2">
          Generate comprehensive HR reports with workforce analytics,
          leave data, performance metrics, and compliance status.
          Download as PDF or Excel.
        </p>

        <button
          onClick={generateReport}
          disabled={loading}
          className="btn-primary mt-8 px-8"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <FaDownload className="text-sm" />
              Generate Report
            </>
          )}
        </button>

        {error && (
          <div className="result-panel mt-6 max-w-lg w-full border-red-500/30">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {report && (

          <div className="mt-8 w-full max-w-3xl text-left animate-slide-up">

            <div className="flex items-center gap-2 mb-6 justify-center">
              <FaCheckCircle className="text-emerald-400" />
              <p className="text-sm text-emerald-400 font-medium">
                {report.message}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">

              <button
                onClick={() => downloadFile("pdf")}
                className="btn-primary"
              >
                <FaFilePdf />
                Download PDF
              </button>

              <button
                onClick={() => downloadFile("excel")}
                className="btn-secondary"
              >
                <FaFileExcel />
                Download Excel
              </button>

            </div>

            {summary && (

              <div className="result-panel">

                <h3 className="section-heading">
                  Report Preview
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">

                  {[
                    ["Generated On", summary.generated_on],
                    ["Total Employees", summary.total_employees],
                    ["Total Departments", summary.total_departments],
                    ["Average Rating", summary.average_rating],
                    ["Avg Present Days", summary.average_present_days],
                    ["Total Leave Days", summary.total_leave_days],
                    ["Avg Leave Days", summary.average_leave_days],
                    ["Missing PAN", summary.missing_pan],
                    ["Missing NDA", summary.missing_nda],
                  ].map(([label, value]) => (

                    <div key={label} className="glass rounded-xl p-4">
                      <p className="stat-label">{label}</p>
                      <p className="text-base font-semibold text-white mt-1">
                        {value}
                      </p>
                    </div>

                  ))}

                </div>

                {summary.leave_type_distribution && (

                  <div>

                    <h4 className="text-sm font-semibold text-slate-300 mb-3">
                      Leave Type Distribution
                    </h4>

                    <div className="space-y-2">

                      {Object.entries(
                        summary.leave_type_distribution
                      ).map(([type, count]) => (

                        <div
                          key={type}
                          className="list-item-card"
                        >
                          <span className="text-sm text-slate-300">
                            {type}
                          </span>
                          <span className="badge-info">
                            {count} records
                          </span>
                        </div>

                      ))}

                    </div>

                  </div>

                )}

                {summary.department_headcount && (

                  <div className="mt-6">

                    <h4 className="text-sm font-semibold text-slate-300 mb-3">
                      Department Headcount
                    </h4>

                    <div className="space-y-2">

                      {Object.entries(
                        summary.department_headcount
                      ).map(([dept, count]) => (

                        <div
                          key={dept}
                          className="list-item-card"
                        >
                          <span className="text-sm text-slate-300">
                            {dept}
                          </span>
                          <span className="badge-info">
                            {count} employees
                          </span>
                        </div>

                      ))}

                    </div>

                  </div>

                )}

              </div>

            )}

          </div>

        )}

      </div>

    </div>

  );

}

export default Reports;
