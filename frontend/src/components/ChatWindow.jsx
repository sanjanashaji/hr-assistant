import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";

import Loader from "./Loader";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import EmployeeCard from "./EmployeeCard";

import { sendMessage } from "../api/chatApi";

import {
  parseEmployeeResponse
} from "../utils/employeeParser";

const ChatWindow = forwardRef((props, ref) => {

  const [messages, setMessages] =
    useState([
      {
        sender: "bot",
        message:
          "👋 Welcome to HR AI Assistant.\n\nAsk me about employees, managers, salaries, performance scores, departments, HR policies or company guidelines."
      }
    ]);

  const [loading, setLoading] =
    useState(false);

  const messagesEndRef =
    useRef(null);

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages, loading]);

  const handleSend = async (
    question
  ) => {

    if (!question?.trim()) return;

    setMessages(prev => [
      ...prev,
      {
        sender: "user",
        message: question
      }
    ]);

    try {

      setLoading(true);

      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
      });

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setMessages(prev => [
          ...prev,
          { sender: "bot", message: data.answer }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          { sender: "bot", message: "" }
        ]);
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let done = false;
        let isFirstChunk = true;
        
        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          if (value) {
            if (isFirstChunk) {
              setLoading(false);
              isFirstChunk = false;
            }
            const chunk = decoder.decode(value, { stream: true });
            setMessages(prev => {
              const newMsgs = [...prev];
              newMsgs[newMsgs.length - 1] = {
                ...newMsgs[newMsgs.length - 1],
                message: newMsgs[newMsgs.length - 1].message + chunk
              };
              return newMsgs;
            });
          }
        }
      }

    } catch (error) {

      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          message:
            "❌ Unable to connect to backend."
        }
      ]);

    } finally {

      setLoading(false);

    }

  };

  useImperativeHandle(ref, () => ({
    sendPrompt: handleSend
  }));

  return (

    <div
      className="
        glass
        rounded-3xl
        h-full
        flex
        flex-col
        overflow-hidden
        shadow-2xl
        shadow-black/30
      "
    >

      {/* Messages Area */}

      <div
        className="
          flex-1
          overflow-y-auto
          px-6
          py-5
        "
      >

        {/* Welcome Cards */}

        {messages.length === 1 && (

          <div
            className="
              grid
              grid-cols-2
              gap-3
              mb-6
            "
          >

            <button
              onClick={() =>
                handleSend(
                  "details of Rahul Sharma 118"
                )
              }
              className="
                glass
                rounded-2xl
                p-5
                text-left
                border
                border-transparent
                hover:border-cyan-500/30
                hover:shadow-glow-sm
                hover:-translate-y-0.5
                transition-all
                duration-200
              "
            >
              <h3 className="font-semibold text-base text-white">
                👤 Employee Details
              </h3>

              <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
                View employee profile,
                salary and performance
              </p>
            </button>

            <button
              onClick={() =>
                handleSend(
                  "manager of Rahul Sharma 118"
                )
              }
              className="
                glass
                rounded-2xl
                p-5
                text-left
                border
                border-transparent
                hover:border-cyan-500/30
                hover:shadow-glow-sm
                hover:-translate-y-0.5
                transition-all
                duration-200
              "
            >
              <h3 className="font-semibold text-base text-white">
                👨‍💼 Manager Lookup
              </h3>

              <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
                Find reporting manager
              </p>
            </button>

            <button
              onClick={() =>
                handleSend(
                  "top employees"
                )
              }
              className="
                glass
                rounded-2xl
                p-5
                text-left
                border
                border-transparent
                hover:border-cyan-500/30
                hover:shadow-glow-sm
                hover:-translate-y-0.5
                transition-all
                duration-200
              "
            >
              <h3 className="font-semibold text-base text-white">
                🏆 Top Employees
              </h3>

              <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
                View highest performers
              </p>
            </button>

            <button
              onClick={() =>
                handleSend(
                  "What is work life balance policy?"
                )
              }
              className="
                glass
                rounded-2xl
                p-5
                text-left
                border
                border-transparent
                hover:border-cyan-500/30
                hover:shadow-glow-sm
                hover:-translate-y-0.5
                transition-all
                duration-200
              "
            >
              <h3 className="font-semibold text-base text-white">
                📜 HR Policies
              </h3>

              <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
                Company guidelines
                and policies
              </p>
            </button>

          </div>

        )}

        {/* Messages */}

        {messages.map(
          (
            message,
            index
          ) => {

            const employee =
              parseEmployeeResponse(
                message.message
              );

            if (
              employee
            ) {

              return (
                <div
                  key={index}
                  className="mb-4"
                >
                  <EmployeeCard
                    employee={
                      employee
                    }
                  />
                </div>
              );

            }

            return (

              <MessageBubble
                key={index}
                sender={
                  message.sender
                }
                message={
                  message.message
                }
              />

            );

          }
        )}

        {/* Loader */}

        {loading && (
          <Loader />
        )}

        <div
          ref={
            messagesEndRef
          }
        />

      </div>

      {/* Input Area */}

      <div
        className="
          shrink-0
          border-t
          border-slate-800/80
          bg-slate-900/40
          px-5
          py-4
        "
      >

        <ChatInput
          onSend={
            handleSend
          }
          loading={
            loading
          }
        />

      </div>

    </div>

  );

});

ChatWindow.displayName =
  "ChatWindow";

export default ChatWindow;