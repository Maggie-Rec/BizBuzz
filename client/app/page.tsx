"use client";

// import { SessionProvider } from "next-auth/react";

import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";
import rootReducer from "../reducer";

/* COMPONENTS */
import NewSideBar from "../components/newSideBar";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Dashboard from "../components/Dashboard";
import LoginPage from "./login/page";
import ReportsView from "../components/ReportsView";

const store = legacy_createStore(rootReducer);

const MainPage = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isOnReports, setIsOnReports] = useState(false);

  store.subscribe(() =>
    setIsOnReports(store.getState().currentTab === 'reports')
  )

  return (

    <Provider store={store}>
      {/* <div>
        {isLogged ? (
          <LoginPage />
        ) : (
          <div>
            <NavBar />
            <div className="container">
              <SideBar />
              {
                isOnReports
                ? <ReportsView/>
                : <Dashboard/>
              }
            </div>
          </div>
        )}
      </div> */}
    <NewSideBar/>
    </Provider>
  );
};

export default MainPage;
