"use client";

// import { SessionProvider } from "next-auth/react";

import React, { Suspense, useEffect, useLayoutEffect, useState } from "react";
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";
import rootReducer from "../reducer";

/* COMPONENTS */

import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Dashboard from "../components/Dashboard";
import LoginPage from "./login/page";
import ReportsView from "../components/ReportsView";
import LocationsView from "../components/LocationsView";
import Loading from "./loading";

const store = legacy_createStore(rootReducer);

const MainPage = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isOnDashboard, setIsOnDashboard] = useState(true);
  const [isOnReports, setIsOnReports] = useState(false);
  const [isOnLocations, setIsOnLocations] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  store.subscribe(() =>
    setIsOnReports(store.getState().currentTab === 'reports')
  )

  store.subscribe(() =>
    setIsOnLocations(store.getState().currentTab === 'locations')
  )

  store.subscribe(() =>
    setIsOnDashboard(store.getState().currentTab === 'dashboard')
  )

  function componentDidMount() {
    console.log('mounted')
  }

  // useEffect(() => {
  //   console.log('layout')
  //   setTimeout(() => {
  //     setIsLoading(false)
  //   }, 1000);
  // }, [isLoading])

  return (
    // <> {isLoading ?
      // <Loading /> :
      <Provider store={store}>
        <div>
          {isLogged ? (
            <LoginPage />
          ) : (
            <div>
              <NavBar />
              <div className="container">
                <SideBar />
                {isOnDashboard ? <Dashboard /> : null}
                {isOnReports ? <ReportsView /> : null}
                {isOnLocations ? <LocationsView /> : null}
              </div>
            </div>
          )}
        </div>
      </Provider>
      // }
    // </>
  );
};

export default MainPage;
