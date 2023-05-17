"use client";

import { SessionProvider } from "next-auth/react";

import React, { Suspense, useEffect, useLayoutEffect, useState } from "react";
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";
import rootReducer from "../reducer";

/* COMPONENTS */

import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import NewSideBar2 from "../components/NewSidebar";
import Dashboard from "../components/dashboard/dashboard";
import LoginPage from "./login/page";
import LocationsView from "../components/LocationsView";
import Loading from "./loading";
import ReportsView from "../components/ReportsView";
import InventoryView from "../components/InventoryView";
import EmailMaker from "../components/email";

const store = legacy_createStore(rootReducer);

const MainPage = () => {
  const [currentTab, setCurrentTab] = useState("dashboard");
  // const [isOnDashboard, setIsOnDashboard] = useState(true);
  const [isOnReports, setIsOnReports] = useState(false);
  // const [isOnLocations, setIsOnLocations] = useState(false);

  store.subscribe(() =>
    setIsOnReports(store.getState().currentTab === "reports")
  );

  store.subscribe(() => setCurrentTab(store.getState().currentTab));

  return (
    <>
      <Provider store={store}>
        <div>
          {/* <Suspense fallback={<p>Loading..</p>}>
          <NavBar />
            </Suspense> */}
          <div className="container">
            <NewSideBar2 />
            {currentTab === "dashboard" ? (
              <Dashboard />
              // <EmailMaker />
            ) : currentTab === "reports" ? (
              <ReportsView />
            ) : currentTab === "locations" ? (
              <LocationsView />
            ) : currentTab === "inventory" ? (
              <InventoryView />
            ) : (
              <p>ERROR</p>
            )}
          </div>
        </div>
      </Provider>
    </>
  );
};

export default MainPage;
