import Sidebar from "./Sidebar";
import FloatingBackground from "./FloatingBackground";

function Layout({
  children,
  activeTab,
  setActiveTab
}) {
  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 relative overflow-hidden min-w-0">

        <FloatingBackground />

        <div className="relative z-10 h-full overflow-hidden">
          {children}
        </div>

      </div>

    </div>
  );
}

export default Layout;
