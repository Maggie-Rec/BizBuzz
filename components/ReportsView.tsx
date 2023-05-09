'use client';

import styles from '../styles/ReportsView.module.css';
import React, { useState } from 'react';
import { Button, Segmented, DatePicker, TreeSelect } from 'antd';
import { filters } from '@/utils/filters';
const { RangePicker } = DatePicker;

const ReportsView = () => {

  const [isDropdownCollapsed, setIsDropdownCollapsed] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.filterSelector}>
        <TreeSelect
      showSearch
      style={{
        width: '15vw',
      }}
      dropdownStyle={{
        maxHeight: 400,
        overflow: 'auto',
      }}
      placeholder="Select filters"
      allowClear
      multiple
      treeDefaultExpandAll
      treeData={filters}
    />
          <Button type='primary' style={{ minWidth: "6vw" }}>Apply</Button>
        </div>
        <div className={styles.dateSelector}>
          <Segmented options={['Today', 'Last Week', 'Last Month', 'Last Quarter', 'Last Year']}></Segmented>
          <RangePicker style={{ width: "15vw" }}></RangePicker>
        </div>
        <Button type='primary'>Upload Data</Button>
        </div>
      </div>
      )
}

      export default ReportsView;