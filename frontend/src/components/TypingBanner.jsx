import { Typewriter } from "react-simple-typewriter";

function TypingBanner() {
  return (
    <div className="text-center">

      <h1 className="text-6xl font-bold text-white">
        HR AI Assistant
      </h1>

      <div className="text-cyan-400 text-xl mt-4">

        <Typewriter
          words={[
            "Employee Information Assistant",
            "Company Policy Assistant",
            "Enterprise HR Support",
            "AI Powered Workplace Assistant"
          ]}
          loop={0}
          cursor
          cursorStyle="|"
          typeSpeed={60}
          deleteSpeed={40}
          delaySpeed={1500}
        />

      </div>

    </div>
  );
}

export default TypingBanner;