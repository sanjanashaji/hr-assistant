import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCalendarAlt,
  FaBuilding,
  FaUsers,
  FaClipboardList
} from "react-icons/fa";

const API_BASE = "http://127.0.0.1:5000";

function LeaveAnalytics() {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    axios
      .get(`${API_BASE}/leave-analytics`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load leave analytics. Please ensure the backend is running.");
        setLoading(false);
      });

  }, []);

  if (loading) {

    return (
      <div className="page-panel">
        <div className="loading-state">
          <div className="w-5 h-5 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
          Loading leave analytics...
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
          Leave Analytics
        </h1>
        <p className="page-description">
          Comprehensive view of leave patterns, department trends, and employee utilization
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="stat-label">Total Leave Days</p>
            <FaCalendarAlt className="text-cyan-400/60" />
          </div>
          <p className="stat-value">{data.total_leave_days}</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="stat-label">Average Per Record</p>
            <FaCalendarAlt className="text-cyan-400/60" />
          </div>
          <p className="stat-value">{data.average_leave_days}</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="stat-label">Leave Records</p>
            <FaClipboardList className="text-cyan-400/60" />
          </div>
          <p className="stat-value">{data.total_leave_records}</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="stat-label">Employees on Leave</p>
            <FaUsers className="text-cyan-400/60" />
          </div>
          <p className="stat-value">{data.unique_employees_on_leave}</p>
        </div>

      </div>

      <div className="mt-6 glass rounded-xl p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-amber-500/15 flex items-center justify-center shrink-0">
          <FaBuilding className="text-amber-400" />
        </div>
        <div>
          <p className="stat-label">Highest Leave Department</p>
          <p className="text-xl font-bold text-white mt-1">
            {data.highest_leave_department}
          </p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div>
          <h2 className="section-heading">
            Leave Type Distribution
          </h2>

          <div className="space-y-3">

            {data.leave_type_breakdown?.map(item => (

              <div key={item.type} className="glass rounded-xl p-4">

                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">
                    {item.type}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">
                      {item.total_days} days
                    </span>
                    <span className="badge-info">
                      {item.count} records
                    </span>
                  </div>
                </div>

                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-500 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>

              </div>

            ))}

          </div>

        </div>

        <div>
          <h2 className="section-heading">
            Department Leave Breakdown
          </h2>

          <div className="space-y-3">

            {data.department_breakdown?.map(item => (

              <div key={item.department} className="glass rounded-xl p-4">

                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">
                    {item.department}
                  </span>
                  <span className="badge-info">
                    {item.total_days} days
                  </span>
                </div>

                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>

                <p className="text-xs text-slate-500 mt-1.5">
                  Avg {item.average_days} days per record · {item.percentage}% of total leave
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

      <div className="mt-10">

        <h2 className="section-heading">
          Top Employees by Leave Days
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

          {data.top_employees_by_leave?.map((emp, index) => (

            <div key={emp.employee_id} className="list-item-card">

              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-cyan-500/15 text-cyan-400 text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="text-sm text-slate-300 font-medium">
                  {emp.employee_id}
                </span>
              </div>

              <span className="badge-warning">
                {emp.total_days} days
              </span>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default LeaveAnalytics;
