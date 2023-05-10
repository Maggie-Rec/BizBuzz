'use client';

import styles from '../styles/ReportsView.module.css';
import React, { useState } from 'react';
import { Button, Segmented, DatePicker, TreeSelect, Table, Tooltip } from 'antd';
import { todayTimeFilter, lastWeekTF, lastMonthTF, lastQuarterTF, lastYearTF } from '../utils/timeFilters';
import { PlusOutlined } from '@ant-design/icons';
import { filters } from '../utils/filters';
const { RangePicker } = DatePicker;

/* TABLE COLUMNS */
const columns = [
  {
    title: 'Transaction ID',
    dataIndex: 'transaction_id',
    sorter: (a, b) => a.transaction_id - b.transaction_id,
    width: '10vw',
    align: 'center'
  },
  {
    title: 'Date',
    dataIndex: 'date',
    sorter: (a, b) => a.date - b.date
  },
  {
    title: 'Time',
    dataIndex: 'time',
    sorter: (a, b) => a.time - b.time
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    sorter: (a, b) => a.quantity - b.quantity
  },
  {
    title: 'SKU',
    dataIndex: 'sku',
    sorter: (a, b) => a.sku - b.sku 
  },
]

/* TABLE DATA */
const dataSource = [
  {
    key: '1',
    transaction_id: '1',
    date: '2022-12-21',
    time: '9:07:04',
    quantity: '15',
    sku: '12323'
  },
  {
    key: '2',
    transaction_id: '2',
    date: '2022-12-21',
    time: '12:03:19',
    quantity: '17',
    sku: '12323'
  },
  {
    key: '3',
    transaction_id: '3',
    date: '2022-12-14',
    time: '10:31:47',
    quantity: '18',
    sku: '12323'
  },
  {
    key: '4',
    transaction_id: '4',
    date: '2022-12-08',
    time: '11:41:35',
    quantity: '6',
    sku: '12323'
  },
]

const ReportsView = () => {

  /* TIME FILTER APPLIED */
  const [activeTimeFilter, setActiveTimeFilter] = useState(todayTimeFilter as Date[] | null[]);
  /* TIME FILTER VALUE BEFORE APPLYING CUSTOM DATE RANGE */
  const [previousTimeFilter, setPreviousTimeFilter] = useState([null, null] as Date[] | null[]);
  /* CUSTOM TIME RANGE FILTER VALUE */
  const [customTimeFilter, setCustomTimeFilter] = useState([null, null] as Date[] | null[]);


  /* PROPERTY FILTER APPLIED */
  const [activePropertyFilter, setActivePropertyFilter] = useState([] as string[]);
  /* CUSTOM PROPERTY FILTERS SELECTED */
  const [selectedPropertyFilters, setSelectedPropertyFilters] = useState([] as string[]);


  /* HANDLE FILTER CHANGE FROM SEGMENTED COMPONENT */
  function handleSegmentedChange (value: string) {
    switch (value) {
      case 'Today':
        setActiveTimeFilter(todayTimeFilter);
        break;
      case 'Last Week':
        setActiveTimeFilter(lastWeekTF);
        break;
      case 'Last Month':
        setActiveTimeFilter(lastMonthTF);
        break;
      case 'Last Quarter':
        setActiveTimeFilter(lastQuarterTF);
        break;
      case 'Last Year':
        setActiveTimeFilter(lastYearTF);
        break;
      case 'All Time':
        setActiveTimeFilter([new Date(''), new Date('')]);
        break;
    }
  }

  /* HANDLE CUSTOM RANGE SELECTOR VALUE CHANGE */
  function handleCustomRangeChange (dateArr: string[]) {
    /* ON CUSTOM RANGE CLEAN */
    if (dateArr[0] === '' && dateArr[1] === '') {
      setCustomTimeFilter([null, null]);
      setActiveTimeFilter(previousTimeFilter);
      setPreviousTimeFilter([null, null]);
    } else {
      const newCustomTF = dateArr.map(el => new Date(el));
      setCustomTimeFilter(newCustomTF);
    }
  }

  /* APPLY NEW CUSTOM DATE RANGE AS ACTIVE FILTER */
  function applyNewCustomTF () {
    if (previousTimeFilter[0] === null && previousTimeFilter[1] === null) setPreviousTimeFilter(activeTimeFilter);
    setActiveTimeFilter(customTimeFilter);
    setCustomTimeFilter([null, null]);
  }


  /* HANDLE NEW FILTER SELECTION */
  function handleCustomFiltersChange (filterArr: string[]) {
    setSelectedPropertyFilters(filterArr);
  }

  

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.filterSelector}>
          <TreeSelect
            showSearch
            style={{
              minWidth: '15vw',
              maxWidth: '25vw',
            }}
            dropdownStyle={{
              maxHeight: 400,
              overflow: 'auto',
            }}
            placeholder="Select filters"
            allowClear
            multiple
            treeDefaultExpandAll
            treeCheckable={true}
            treeLine={true}
            treeData={filters}
            onChange={(value) => handleCustomFiltersChange(value)}
          />
          <Button type='primary' style={{ minWidth: "5vw" }}>Apply</Button>
        </div>
        <div className={styles.dateSelector}>
          <Segmented 
            options={['Today', 'Last Week', 'Last Month', 'Last Quarter', 'Last Year', 'All Time']} 
            onChange={(value) => handleSegmentedChange(value as string)} 
            disabled={previousTimeFilter[0] !== null}
          ></Segmented>
          <RangePicker 
            style={{ width: "15vw" }} 
            onChange={(value, stringArr) => handleCustomRangeChange(stringArr)}
          ></RangePicker>
          {customTimeFilter[0] !== null && <Button type='primary' style={{ minWidth: "5vw" }} onClick={() => applyNewCustomTF()}>Apply</Button>}
        </div>
        <Tooltip title='Upload Data' placement='bottomLeft'>
          <Button type='primary'><PlusOutlined/></Button>
        </Tooltip>
      </div>
      <div className={styles.tableContainer}>
        <Table
          sticky={true}
          pagination={false}
          columns={columns}
          dataSource={dataSource}
          scroll={{y: "78vh"}}
        />
      </div>
    </div>
  )
}

export default ReportsView;