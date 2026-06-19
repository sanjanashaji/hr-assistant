import {
  FaUser,
  FaBuilding,
  FaUserTie,
  FaMoneyBillWave,
  FaStar,
  FaBriefcase
} from "react-icons/fa";

function EmployeeCard({
  employee
}) {

  return (

    <div
      className="
        glass
        rounded-2xl
        p-6
        border
        border-cyan-500/20
        shadow-glow-sm
        max-w-3xl
        animate-slide-up
      "
    >

      <div className="flex items-center gap-4">

        <div
          className="
            w-14
            h-14
            rounded-2xl
            bg-cyan-500/15
            border
            border-cyan-500/20
            flex
            items-center
            justify-center
            text-xl
            text-cyan-400
            shrink-0
          "
        >
          <FaUser />
        </div>

        <div className="min-w-0">

          <h2 className="text-xl font-bold text-white truncate">
            {employee.employee_name}
          </h2>

          <p className="text-cyan-400 text-sm font-medium mt-0.5">
            {employee.job_title}
          </p>

        </div>

      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">

        <div className="glass rounded-xl p-4">
          <FaBuilding className="text-cyan-400/70 text-sm" />
          <p className="stat-label mt-2">
            Department
          </p>
          <h3 className="text-base font-semibold text-white mt-1">
            {employee.department}
          </h3>
        </div>

        <div className="glass rounded-xl p-4">
          <FaUserTie className="text-cyan-400/70 text-sm" />
          <p className="stat-label mt-2">
            Manager
          </p>
          <h3 className="text-base font-semibold text-white mt-1">
            {employee.manager_name}
          </h3>
        </div>

        <div className="glass rounded-xl p-4">
          <FaMoneyBillWave className="text-cyan-400/70 text-sm" />
          <p className="stat-label mt-2">
            Salary
          </p>
          <h3 className="text-base font-semibold text-white mt-1">
            ₹ {employee.monthly_salary}
          </h3>
        </div>

        <div className="glass rounded-xl p-4">
          <FaStar className="text-cyan-400/70 text-sm" />
          <p className="stat-label mt-2">
            Performance
          </p>
          <h3 className="text-base font-semibold text-white mt-1">
            ⭐ {employee.performance_score}
          </h3>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-3 mt-3">

        <div className="glass rounded-xl p-4">
          <FaBriefcase className="text-cyan-400/70 text-sm" />
          <p className="stat-label mt-2">
            Years At Company
          </p>
          <h3 className="text-base font-semibold text-white mt-1">
            {employee.years_at_company}
          </h3>
        </div>

        <div className="glass rounded-xl p-4">
          <FaStar className="text-cyan-400/70 text-sm" />
          <p className="stat-label mt-2">
            Satisfaction
          </p>
          <h3 className="text-base font-semibold text-white mt-1">
            {employee.employee_satisfaction_score}
          </h3>
        </div>

      </div>

    </div>

  );

}

export default EmployeeCard;
