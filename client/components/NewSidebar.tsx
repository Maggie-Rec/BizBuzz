"use client";

import React, { useEffect, useState } from "react";
import styles from "../styles/newSideBar2.module.css";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  BarChartOutlined,
  DashboardOutlined,
  ControlOutlined,
  UserOutlined,
  EnvironmentOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import { Modal, ConfigProvider, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo1.png";
import logoSml from "../assets/logo-sml.png";
import Image from "next/image";
import Profile from "./Profile";
import DataUpload from "./DataUpload";
import randomAlphaNumeric from "../utils/randomizer";

const NewSideBar2 = () => {
  const currTab = useSelector((state: any) => state.currentTab);
  const dispatch = useDispatch();

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeProfile, setActiveProfile] = useState(false);
  const [username, setUsername] = useState("Your business");
  const [showUploadModal, setShowUploadModal] = useState(false);

  function handleUploadModal() {
    setShowUploadModal(!showUploadModal);
  };

  function openProfile() {
    setActiveProfile(true);
  }
  function handleOk() {
    setActiveProfile(false);
  }

  function handleCancel() {
    setActiveProfile(false);
  }

  useEffect(() => {
    const username = cookieStore.get("username")
      .then(data => {
        console.log(data);
        setUsername(data.value)
      }
      );
  }, []);

  return (
    <>
      <div>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#f8b825",
            },
          }}
        >
          <div className={styles.userInfoContainer}>
            {isCollapsed ? (
              <Image
                src={logoSml}
                height={96}
                width={96}
                alt="small logo"
                className={styles.smlLogo}
              />
            ) : (
              <Image
                src={logo}
                height={118}
                alt="logo"
                className={styles.logo}
              />
            )}

            <div
              className={
                isCollapsed
                  ? styles.iconContainerCollapsed
                  : styles.iconContainer
              }
              onClick={() => {
                openProfile();
              }}
            >
              <UserOutlined className={styles.icon} />
              {!isCollapsed && <h3>Your Name</h3>}
            </div>
            <Modal
              open={activeProfile}
              title="Your Profile"
              onOk={handleOk}
              onCancel={handleCancel}
              style={{
                top: 20,
              }}
              width={1000}
            >
              <Profile />
            </Modal>
          </div>
          <div className={styles.moduleListContainer}>
            <div className={styles.moduleList}>
              <div
                className={
                  isCollapsed
                    ? styles.iconContainerCollapsed
                    : styles.iconContainer
                }
                onClick={() =>
                  dispatch({ type: "CHANGE_CURRENT_TAB", payload: "dashboard" })
                }
              >
                <DashboardOutlined className={styles.icon} />
                {!isCollapsed && <p>Dashboard</p>}
              </div>
              <div
                className={
                  isCollapsed
                    ? styles.iconContainerCollapsed
                    : styles.iconContainer
                }
                onClick={() =>
                  dispatch({ type: "CHANGE_CURRENT_TAB", payload: "reports" })
                }
              >
                <BarChartOutlined className={styles.icon} />
                {!isCollapsed && <p>Sales Reports</p>}
              </div>
              <div
                className={
                  isCollapsed
                    ? styles.iconContainerCollapsed
                    : styles.iconContainer
                }
                onClick={() =>
                  dispatch({ type: "CHANGE_CURRENT_TAB", payload: "locations" })
                }
              >
                <UserOutlined
                  className={styles.icon}

                />
                {!isCollapsed && <h3>{username}</h3>}
              </div>

            </div>
            
            <div className={styles.moduleListContainer}>
              <div className={styles.moduleList}>
                <div
                  className={
                    isCollapsed
                      ? styles.iconContainerCollapsed
                      : styles.iconContainer
                  }
                  onClick={() =>
                    dispatch({ type: "CHANGE_CURRENT_TAB", payload: "dashboard" })
                  }
                >
                  <DashboardOutlined className={styles.icon} />
                  {!isCollapsed && <p>Dashboard</p>}
                </div>
                <div
                  className={
                    isCollapsed
                      ? styles.iconContainerCollapsed
                      : styles.iconContainer
                  }
                  onClick={() =>
                    dispatch({ type: "CHANGE_CURRENT_TAB", payload: "reports" })
                  }
                >
                  <BarChartOutlined className={styles.icon} />
                  {!isCollapsed && <p>Sales Reports</p>}
                </div>
                <div
                  className={
                    isCollapsed
                      ? styles.iconContainerCollapsed
                      : styles.iconContainer
                  }
                  onClick={() =>
                    dispatch({ type: "CHANGE_CURRENT_TAB", payload: "locations" })
                  }
                >
                  <EnvironmentOutlined className={styles.icon} />
                  {!isCollapsed && <p>Locations</p>}
                </div>
              </div>

              <div className={styles.utisList}>
                <div onClick={handleUploadModal}>
                  <div
                    className={
                      isCollapsed
                        ? styles.iconContainerCollapsed
                        : styles.iconContainer
                    }
                  >
                    <CloudUploadOutlined className={styles.icon} />
                    {!isCollapsed && <p>Upload data</p>}
                  </div>
                </div>

                <div>
                  <div
                    className={
                      isCollapsed
                        ? styles.iconContainerCollapsed
                        : styles.iconContainer
                    }
                  >
                    <ControlOutlined className={styles.icon} />
                    {!isCollapsed && <p>Options</p>}
                  </div>
                </div>
              </div>

            </div>

          </div>

          <div
            className={styles.collapseButton}
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
              left: isCollapsed ? "6.6vw" : "15.3vw",
            }}
          >
            {isCollapsed ? <CaretRightOutlined /> : <CaretLeftOutlined />}
          </div>
        </ConfigProvider>
        {
          showUploadModal ?
            <Modal open={showUploadModal} onCancel={handleCancel}
              footer={[
                <Button key={randomAlphaNumeric()} onClick={handleUploadModal}>Done</Button>
              ]}>
              {<DataUpload />}
            </Modal>
            : undefined
        }
      </div>
    </>
  );
};

export default NewSideBar2;
