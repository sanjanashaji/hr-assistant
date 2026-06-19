function MessageBubble({
  sender,
  message
}) {

  const isUser =
    sender === "user";

  return (

    <div
      className={`flex mb-4 ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >

      <div
        className={`
          max-w-[75%]
          px-5
          py-3.5
          rounded-2xl
          whitespace-pre-wrap
          text-sm
          leading-relaxed

          ${
            isUser
              ? "bg-cyan-500 text-white rounded-br-md shadow-lg shadow-cyan-500/20"
              : "glass text-slate-200 rounded-bl-md"
          }
        `}
      >
        {message}
      </div>

    </div>

  );

}

export default MessageBubble;
