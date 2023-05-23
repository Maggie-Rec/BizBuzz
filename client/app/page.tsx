"use client";

import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";
import rootReducer from "../reducer";

/* COMPONENTS */

import NewSideBar2 from "../components/NewSidebar";
import Dashboard from "../components/dashboard/dashboard";
import LocationsView from "../components/LocationsView";
import ReportsView from "../components/ReportsView";
import InventoryView from "../components/InventoryView";

const store = legacy_createStore(rootReducer);

const MainPage = () => {
  const [currentTab, setCurrentTab] = useState("dashboard");

  const [isOnReports, setIsOnReports] = useState(false);
 

  store.subscribe(() =>
    setIsOnReports(store.getState().currentTab === "reports")
  );

  store.subscribe(() => setCurrentTab(store.getState().currentTab));

  useEffect(() => {
    /* @ts-ignore */
    if (window.cookieStore) {
      /* @ts-ignore */
      window.cookieStore.get("token").then((data) => {
        if (!data || data.value.length === 0) {
          window.location.replace("http://localhost:3000/login");
        }
      });
    }
  }, []);

  return (
    <>
      <Provider store={store}>
        <div>
          <div className="container">
            <NewSideBar2 />
            {currentTab === "dashboard" ? (
              <Dashboard />
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
