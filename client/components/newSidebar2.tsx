'use client';

import React, { useState } from "react";
import styles from '../styles/newSideBar2.module.css';
import { CaretLeftOutlined, CaretRightOutlined, BarChartOutlined, DashboardOutlined, ControlOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";


const NewSideBar2 = () => {

  const currTab = useSelector((state: any) => state.currentTab);
  const dispatch = useDispatch();

  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div>
      <div
        className={styles.container}
        style={{ width: isCollapsed ? '5vw' : '15vw' }}
      >
        <div className={styles.userInfoContainer}>
          <div className={styles.iconContainer} style={{ justifyContent: isCollapsed ? 'center' : 'flex-start', paddingLeft: isCollapsed ? '' : '0.7vw' }}>
            {isCollapsed
              ? <h1>BB</h1>
              : <h1>BizBuzz 🐝</h1>
            }
          </div>
          <div className={styles.iconContainer} style={{ justifyContent: isCollapsed ? 'center' : 'flex-start', paddingLeft: isCollapsed ? '' : '0.7vw' }}>
            <UserOutlined className={styles.icon} />
            {!isCollapsed && <h3>Your Name</h3>}
          </div>
        </div>
        <div className={styles.moduleListContainer}>
          <div className={styles.moduleList}>
            <div
              className={styles.iconContainer}
              style={{ justifyContent: isCollapsed ? 'center' : 'flex-start', paddingLeft: isCollapsed ? '' : '0.7vw' }}
              onClick={() => dispatch({ type: 'CHANGE_CURRENT_TAB', payload: 'dashboard' })}
            >
              <DashboardOutlined
                className={styles.icon}
              />
              {!isCollapsed && <p>Dashboard</p>}
            </div>
            <div
              className={styles.iconContainer}
              style={{ justifyContent: isCollapsed ? 'center' : 'flex-start', paddingLeft: isCollapsed ? '' : '0.7vw' }}
              onClick={() => dispatch({ type: 'CHANGE_CURRENT_TAB', payload: 'reports' })}
            >
              <BarChartOutlined
                className={styles.icon}
              />
              {!isCollapsed && <p>Sales Reports</p>}
            </div>
          </div>
          <div>
            <div className={styles.iconContainer} style={{ justifyContent: isCollapsed ? 'center' : 'flex-start', paddingLeft: isCollapsed ? '' : '0.7vw' }}>
              <ControlOutlined className={styles.icon} />
              {!isCollapsed && <p>Options</p>}
            </div>
          </div>
        </div>
      </div>
      <div
        className={styles.collapseButton}
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{ left: isCollapsed ? '5vw' : '15vw' }}
      >{isCollapsed
        ? <CaretRightOutlined />
        : <CaretLeftOutlined />}
      </div>
    </div>
  )

}

export default NewSideBar2;