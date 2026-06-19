import { Typewriter } from "react-simple-typewriter";

function Header() {
  return (
    <header className="shrink-0 pb-2">

      <h1 className="text-3xl font-bold text-white tracking-tight">
        HR AI Assistant
      </h1>

      <div className="mt-2 text-cyan-400/90 text-base h-7 font-medium">
        <Typewriter
          words={[
            "Employee Information Assistant",
            "Company Policy Assistant",
            "Manager Lookup Assistant",
            "Enterprise HR Copilot",
            "AI Powered Workforce Assistant"
          ]}
          loop={0}
          cursor
          cursorStyle="|"
          typeSpeed={60}
          deleteSpeed={40}
          delaySpeed={1500}
        />
      </div>

      <div className="mt-5 h-px bg-gradient-to-r from-cyan-500/40 via-slate-700/50 to-transparent" />

    </header>
  );
}

export default Header;
