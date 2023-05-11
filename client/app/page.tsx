"use client";

// import { SessionProvider } from "next-auth/react";

import React, { useState } from "react";
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";
import rootReducer from "../reducer";

/* COMPONENTS */

import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Dashboard from "../components/Dashboard";
import LoginPage from "./login/page";
import ReportsView from "../components/ReportsView";

const store = legacy_createStore(rootReducer);
const MainPage = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isOnReports, setIsOnReports] = useState(true);

  return (

    <Provider store={store}>
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
    </Provider>
  );
};

export default MainPage;
