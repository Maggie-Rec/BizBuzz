'use client';

import React, { useState } from "react";
import styles from '../styles/newSideBar2.module.css';
import { CaretLeftOutlined, CaretRightOutlined, BarChartOutlined, DashboardOutlined, ControlOutlined, UserOutlined } from '@ant-design/icons';


const NewSideBar2 = () => {

  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div>
      <div
        className={styles.container}
        style={{
          width: isCollapsed ? '5vw' : '15vw'
        }}
      >
        <div className={styles.userInfoContainer}>
          <UserOutlined className={styles.icon}/>
        </div>
        <div className={styles.moduleListContainer}>
          <div className={styles.moduleList}>
            <DashboardOutlined className={styles.icon}/>
            <BarChartOutlined className={styles.icon}/>
          </div>
          <div>
            <ControlOutlined className={styles.icon}/>
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