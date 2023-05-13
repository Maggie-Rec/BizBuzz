"use client";

import { SessionProvider } from "next-auth/react";

import React, { Suspense, useEffect, useLayoutEffect, useState } from "react";
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
import Loading from "./loading";

const store = legacy_createStore(rootReducer);

const MainPage = () => {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [isOnDashboard, setIsOnDashboard] = useState(true);
  const [isOnReports, setIsOnReports] = useState(false);
  const [isOnLocations, setIsOnLocations] = useState(false);

  store.subscribe(() =>
    setIsOnReports(store.getState().currentTab === "reports")
  );

  store.subscribe(() => setCurrentTab(store.getState().currentTab));

  return (
    <Provider store={store}>
      <div>
        <div>
          <NavBar />
          <div className="container">
            <SideBar />
            {currentTab === "dashboard" ? (
              <Dashboard />
            ) : currentTab === "reports" ? (
              <ReportsView />
            ) : currentTab === "locations" ? (
              <LocationsView />
            ) : (
              <p>ERROR</p>
            )}
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default MainPage;
