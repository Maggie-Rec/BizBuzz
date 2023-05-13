"use client";

import { SessionProvider } from "next-auth/react";

import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";
import rootReducer from "../reducer";

/* COMPONENTS */

import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Dashboard from "../components/dashboard/dashboard";
import LoginPage from "./login/page";
import ReportsView from "../components/ReportsView";

const store = legacy_createStore(rootReducer);

const MainPage = ({ session, ...pageProps }) => {
  const [isLogged, setIsLogged] = useState(true);
  const [isOnReports, setIsOnReports] = useState(false);

  store.subscribe(() =>
    setIsOnReports(store.getState().currentTab === "reports")
  );

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <div>
         
            <div>
              <NavBar />
              <div className="container">
                <SideBar />
                {isOnReports ? <ReportsView /> : <Dashboard />}
              </div>
            </div>
      
        </div>
      </Provider>
    </SessionProvider>
  );
};

export default MainPage;
