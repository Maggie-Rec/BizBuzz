import React, { useState } from 'react';
import styles from '../styles/newSideBar.module.css';
import { CaretLeftOutlined, CaretRightOutlined, BarChartOutlined, DashboardOutlined, ControlOutlined, UserOutlined } from '@ant-design/icons';

const NewSideBar = () => {

  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <UserOutlined />
        <h2>Name</h2>
      </div>
      <div className={styles.moduleList}>
        <div className={styles.moduleListContainer}>
          <div className={styles.moduleCard}>
            <DashboardOutlined />
            <p>Dashboard</p>
          </div>
          <div className={styles.moduleCard}>
            <BarChartOutlined />
            <p>Sales Reports</p>
          </div>
        </div>
        <div className={styles.moduleCard}>
          <ControlOutlined />
          <p>Options</p>
        </div>
      </div>
      <div
        className={styles.collapseButton}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed
          ? <CaretRightOutlined />
          : <CaretLeftOutlined />
        }
      </div>
    </div>
  )
}

export default NewSideBar;