import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { API_BASE } from "../config/api";
import {
  FaIdCard,
  FaFileContract,
  FaFingerprint,
  FaCheckCircle,
  FaExclamationTriangle,
  FaFilter
} from "react-icons/fa";

const DOC_ICONS = {
  PAN: FaIdCard,
  Aadhaar: FaFingerprint,
  NDA: FaFileContract
};

function Audit() {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deptFilter, setDeptFilter] = useState("all");
  const [docFilter, setDocFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {

    axios
      .get(`${API_BASE}/audit`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load audit data.");
        setLoading(false);
      });

  }, []);

  const filteredEmployees = useMemo(() => {

    if (!data?.employees) return [];

    return data.employees.filter(emp => {

      const matchesDept =
        deptFilter === "all" ||
        emp.department === deptFilter;

      const matchesDoc =
        docFilter === "all" ||
        emp.missing_documents.includes(docFilter);

      const matchesSearch =
        !search ||
        emp.full_name.toLowerCase().includes(search.toLowerCase()) ||
        emp.employee_id.toLowerCase().includes(search.toLowerCase());

      return matchesDept && matchesDoc && matchesSearch;

    });

  }, [data, deptFilter, docFilter, search]);

  if (loading) {
    return (
      <div className="page-panel">
        <div className="loading-state">
          <div className="w-5 h-5 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
          Loading audit data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-panel">
        <div className="loading-state text-red-400">{error}</div>
      </div>
    );
  }

  const { summary, by_document, by_department } = data;

  return (

    <div className="page-panel animate-fade-in">

      <div className="mb-8">
        <h1 className="page-title">HR Audit Dashboard</h1>
        <p className="page-description">
          Detailed compliance gaps — missing documents by employee and department
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        <div className="stat-card">
          <p className="stat-label">Total Employees</p>
          <p className="stat-value">{summary.total_employees}</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Fully Compliant</p>
          <p className="stat-value text-emerald-400">{summary.fully_compliant}</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">With Document Gaps</p>
          <p className="stat-value text-amber-400">{summary.employees_with_gaps}</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Departments Affected</p>
          <p className="stat-value">{by_department.filter(d => d.employees_with_gaps > 0).length}</p>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">

        {by_document.map(doc => {

          const Icon = DOC_ICONS[doc.document] || FaExclamationTriangle;

          return (
            <div key={doc.document} className="glass rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
                  <Icon className="text-amber-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">{doc.document}</p>
                  <p className="text-xs text-slate-400">Missing document</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-amber-400">{doc.missing_count}</p>
              <p className="text-xs text-slate-500 mt-1">
                Across {doc.departments_affected} departments
              </p>
            </div>
          );

        })}

      </div>

      <div className="mb-10">
        <h2 className="section-heading">Department Compliance Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-700/50">
                <th className="pb-3 pr-4 font-medium">Department</th>
                <th className="pb-3 pr-4 font-medium">Employees</th>
                <th className="pb-3 pr-4 font-medium">Missing PAN</th>
                <th className="pb-3 pr-4 font-medium">Missing Aadhaar</th>
                <th className="pb-3 pr-4 font-medium">Missing NDA</th>
                <th className="pb-3 font-medium">With Gaps</th>
              </tr>
            </thead>
            <tbody>
              {by_department.map(dept => (
                <tr key={dept.department} className="border-b border-slate-800/50">
                  <td className="py-3 pr-4 text-white font-medium">{dept.department}</td>
                  <td className="py-3 pr-4 text-slate-300">{dept.total_employees}</td>
                  <td className="py-3 pr-4 text-amber-400">{dept.missing_pan}</td>
                  <td className="py-3 pr-4 text-amber-400">{dept.missing_aadhaar}</td>
                  <td className="py-3 pr-4 text-amber-400">{dept.missing_nda}</td>
                  <td className="py-3">
                    <span className="badge-warning">{dept.employees_with_gaps}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
          <h2 className="section-heading mb-0">
            Non-Compliant Employees ({filteredEmployees.length})
          </h2>

          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
              <select
                className="input-field pl-8 pr-8 h-10 text-sm w-44"
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
              >
                <option value="all">All Departments</option>
                {by_department.map(d => (
                  <option key={d.department} value={d.department}>{d.department}</option>
                ))}
              </select>
            </div>

            <select
              className="input-field h-10 text-sm w-40"
              value={docFilter}
              onChange={(e) => setDocFilter(e.target.value)}
            >
              <option value="all">All Documents</option>
              <option value="PAN">Missing PAN</option>
              <option value="Aadhaar">Missing Aadhaar</option>
              <option value="NDA">Missing NDA</option>
            </select>

            <input
              className="input-field h-10 text-sm w-52"
              placeholder="Search employee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">

          {filteredEmployees.map(emp => (

            <div key={emp.employee_id} className="glass rounded-xl p-4">

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">

                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-white">{emp.full_name}</p>
                    <span className="badge-info text-[10px]">{emp.employee_id}</span>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">
                    {emp.designation} · {emp.department}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{emp.email}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {emp.missing_documents.map(doc => (
                    <span key={doc} className="badge-warning">
                      <FaExclamationTriangle className="mr-1 text-[10px]" />
                      {doc} Missing
                    </span>
                  ))}
                </div>

              </div>

              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-700/40">
                {["PAN", "Aadhaar", "NDA"].map(doc => {
                  const statusKey = {
                    PAN: emp.pan_status,
                    Aadhaar: emp.aadhaar_status,
                    NDA: emp.nda_status
                  }[doc];
                  const isOk = statusKey === "Available";
                  return (
                    <div key={doc} className="flex items-center gap-1.5 text-xs">
                      {isOk ? (
                        <FaCheckCircle className="text-emerald-400" />
                      ) : (
                        <FaExclamationTriangle className="text-amber-400" />
                      )}
                      <span className={isOk ? "text-slate-400" : "text-amber-300"}>
                        {doc}: {statusKey}
                      </span>
                    </div>
                  );
                })}
              </div>

            </div>

          ))}

          {filteredEmployees.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              No employees match the selected filters.
            </div>
          )}

        </div>

      </div>

    </div>

  );

}

export default Audit;
