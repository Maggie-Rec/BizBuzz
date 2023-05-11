"use client";

// import { SessionProvider } from "next-auth/react";

import { useState } from "react";

/* COMPONENTS */

import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Dashboard from "../components/Dashboard";
import LoginPage from "./login/page";
import ReportsView from "../components/ReportsView";

const MainPage = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isOnReports, setIsOnReports] = useState(true);

  return (
    <div>
      {isLogged ? (
        <LoginPage />
      ) : (
        <div>
          <NavBar />
          <div className="container">
            <SideBar />
            {
              isOnReports
              ? <ReportsView />
              : <Dashboard />
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
