import { useState, useRef } from "react";
import Promotion from "./Promotion";
import Reports from "./Reports";
import LeaveAnalytics from "./LeaveAnalytics";

import Layout from "../components/Layout";
import Header from "../components/Header";
import ChatWindow from "../components/ChatWindow";

import Analytics from "./Analytics";
import EmployeeComparison from "./EmployeeComparison";
import Audit from "./Audit";
import ResumeScreening
  from "./ResumeScreening";
import Attrition from "./Attrition";

function Home() {

  const [activeTab,
    setActiveTab] =
    useState("assistant");

  const chatRef =
    useRef();

  const renderContent = () => {

    switch (activeTab) {

      case "analytics":
        return <Analytics />;

      case "comparison":
        return <EmployeeComparison />;

      case "audit":
        return <Audit />;
      case "resume":
        return <ResumeScreening />;
      case "promotion":
        return <Promotion />;

      case "reports":
        return <Reports />;

      case "leave":
        return <LeaveAnalytics />;

      case "attrition":
        return <Attrition />;

      default:
        return (
          <ChatWindow
            ref={chatRef}
          />
        );

    }

  };

  return (

    <Layout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >

      <div className="h-full flex flex-col px-8 py-6">

        <Header />

        <div className="flex-1 min-h-0 mt-6 animate-fade-in">

          {renderContent()}

        </div>

      </div>

    </Layout>

  );

}

export default Home;
