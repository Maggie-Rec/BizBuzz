"use client";

// import { SessionProvider } from "next-auth/react";

import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";
import rootReducer from "../reducer";

/* COMPONENTS */
import NewSideBar2 from "../components/newSidebar2";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Dashboard from "../components/Dashboard";
import LoginPage from "./login/page";
import ReportsView from "../components/ReportsView";
import ReportsView2 from "../components/ReportsView2";

const store = legacy_createStore(rootReducer);

const MainPage = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isOnReports, setIsOnReports] = useState(false);

  store.subscribe(() =>
    setIsOnReports(store.getState().currentTab === 'reports')
  )

  return (

    <Provider store={store}>
      <div>
        {isLogged ? (
          <LoginPage />
        ) : (
          <div>
            {/* <NavBar /> */}
            <div style={{ display: 'flex' }}>
              <NewSideBar2 />
              {isOnReports 
                ? <ReportsView2 />
                : <Dashboard />
              }
            </div>
          </div>
        )}
      </div>

    </Provider>
  );
};

export default MainPage;
