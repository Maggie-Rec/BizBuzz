'use client';

import styles from '../styles/ReportsView.module.css';
import React, { useState } from 'react';
import { Button, Segmented, DatePicker, TreeSelect, Table, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
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
              minWidth: '20vw',
              maxWidth: '25vw'
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
        <Tooltip title='Upload Data' placement='bottomLeft'>
          <Button type='primary'><PlusOutlined/></Button>
        </Tooltip>
      </div>
      <div className={styles.tableContainer}>
        <Table style={{height: "100%"}}/>
      </div>
    </div>
  )
}

export default ReportsView;