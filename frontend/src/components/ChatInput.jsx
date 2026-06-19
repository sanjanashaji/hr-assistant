import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

function ChatInput({
  onSend,
  loading
}) {

  const [message, setMessage] =
    useState("");

  const submit = (e) => {

    e.preventDefault();

    if (!message.trim()) return;

    onSend(message);

    setMessage("");
  };

  return (

    <form
      onSubmit={submit}
      className="flex gap-3 items-center"
    >

      <input
        type="text"
        placeholder="Ask about employees, managers, salaries or HR policies..."
        value={message}
        onChange={(e) =>
          setMessage(
            e.target.value
          )
        }
        disabled={loading}
        className="
          flex-1
          h-12
          px-5
          rounded-xl
          bg-slate-800/80
          border
          border-slate-700
          outline-none
          text-white
          text-sm
          placeholder:text-slate-500
          focus:border-cyan-500
          focus:ring-2
          focus:ring-cyan-500/20
          disabled:opacity-60
          transition-all
          duration-200
        "
      />

      <button
        type="submit"
        disabled={loading}
        className="
          w-12
          h-12
          shrink-0
          rounded-xl
          bg-cyan-500
          flex
          items-center
          justify-center
          text-white

          hover:bg-cyan-400
          hover:shadow-lg
          hover:shadow-cyan-500/30

          active:scale-[0.97]
          disabled:opacity-50
          disabled:cursor-not-allowed
          disabled:hover:shadow-none

          transition-all
          duration-200
        "
      >
        <FaPaperPlane className="text-sm" />
      </button>

    </form>

  );

}

export default ChatInput;
