import {
  FaRobot,
  FaUsers,
  FaBook,
  FaChartLine,
  FaBalanceScale,
  FaClipboardCheck,
  FaArrowUp,
  FaFileAlt,
  FaCalendarAlt,
  FaUserShield
} from "react-icons/fa";

function Sidebar({
  activeTab,
  setActiveTab
}) {

  const menu = [
    {
      label: "AI Assistant",
      icon: <FaRobot />,
      value: "assistant"
    },
    {
      label: "Employee Search",
      icon: <FaUsers />,
      value: "employees"
    },
    {
      label: "HR Policies",
      icon: <FaBook />,
      value: "policies"
    },
    {
      label: "Analytics",
      icon: <FaChartLine />,
      value: "analytics"
    },
    {
      label: "Employee Comparison",
      icon: <FaBalanceScale />,
      value: "comparison"
    },
    {
      label: "HR Audit",
      icon: <FaClipboardCheck />,
      value: "audit"
    },
    {
      label: "Resume Screening",
      icon: <FaUsers />,
      value: "resume"
    },
    {
      label: "Promotion",
      icon: <FaArrowUp />,
      value: "promotion"
    },
    {
      label: "Reports",
      icon: <FaFileAlt />,
      value: "reports"
    },
    {
      label: "Leave Analytics",
      icon: <FaCalendarAlt />,
      value: "leave"
    },
    {
      label: "Attrition Prediction",
      icon: <FaUserShield />,
      value: "attrition"
    }
  ];

  return (

    <aside
      className="
        w-[272px]
        shrink-0
        flex
        flex-col
        h-full
        bg-slate-950/90
        border-r
        border-slate-800/80
      "
    >

      <div className="px-6 pt-7 pb-5 border-b border-slate-800/60">
        <h1 className="text-2xl font-bold text-cyan-400 tracking-tight">
          HR AI
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-medium tracking-wide uppercase">
          Workforce Intelligence
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5">

        {menu.map(item => {

          const isActive = activeTab === item.value;

          return (

            <button
              key={item.value}
              onClick={() =>
                setActiveTab(item.value)
              }
              className={`
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                text-sm
                font-medium
                transition-all
                duration-200

                ${isActive
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-glow-sm"
                  : "text-slate-400 border border-transparent hover:bg-slate-800/60 hover:text-slate-200"
                }
              `}
            >

              <span
                className={`
                  flex
                  items-center
                  justify-center
                  w-8
                  h-8
                  rounded-lg
                  text-sm
                  shrink-0
                  transition-colors
                  ${isActive
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "bg-slate-800/80 text-slate-400"
                  }
                `}
              >
                {item.icon}
              </span>

              <span className="truncate">
                {item.label}
              </span>

            </button>

          );

        })}

      </nav>

      <div className="px-6 py-5 border-t border-slate-800/60">
        <p className="text-xs text-slate-600 text-center">
          Enterprise HR Platform
        </p>
      </div>

    </aside>

  );

}

export default Sidebar;
