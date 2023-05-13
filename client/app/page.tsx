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
import LocationsView from "../components/LocationsView";

const store = legacy_createStore(rootReducer);

const MainPage = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isOnDashboard, setIsOnDashboard] = useState(true);
  const [isOnReports, setIsOnReports] = useState(false);
  const [isOnLocations, setIsOnLocations] = useState(false);

  store.subscribe(() =>
    setIsOnReports(store.getState().currentTab === "reports")
  );

  store.subscribe(() =>
    setIsOnReports(store.getState().currentTab === 'reports')
  )

  return (
    <Provider store={store}>
      <div>
        <div>
          <NavBar />
          <div className="container">
            <SideBar />
            {isOnDashboard ? <Dashboard /> : null}
            {isOnReports ? <ReportsView /> : null}
            {isOnLocations ? <LocationsView /> : null}
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default MainPage;
