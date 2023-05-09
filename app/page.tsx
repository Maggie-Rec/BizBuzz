
"use client";


// import { SessionProvider } from "next-auth/react";

import { useState } from "react";


/* COMPONENTS */

import NavBar from "@/components/NavBar"
import SideBar from "@/components/SideBar";
import Dashboard from "@/components/Dashboard";
import LoginPage from "../app/login/page";
import ReportsView from "@/components/ReportsView";


const MainPage = () => {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <div>
      {isLogged ? (
        <LoginPage />
      ) : (
        <div>
          <NavBar />
          <div className="container">
            <SideBar />
            <Dashboard />
            {/* <ReportsView /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
