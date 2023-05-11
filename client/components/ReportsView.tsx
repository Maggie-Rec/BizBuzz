'use client';

import styles from '../styles/ReportsView.module.css';
import React, { use, useEffect, useState } from 'react';
import { Button, Segmented, DatePicker, TreeSelect, Table, Tooltip, Tree } from 'antd';
import { todayTimeFilter, lastWeekTF, lastMonthTF, lastQuarterTF, lastYearTF } from '../utils/timeFilters';
import { PlusOutlined } from '@ant-design/icons';
import { filters } from '../utils/filters';
import { generateQuery } from '../utils/queryKing';
const { RangePicker } = DatePicker;

/* TABLE COLUMNS */
const columns = [
  {
    title: 'Transaction ID',
    dataIndex: 'transaction_id',
    sorter: (a, b) => a.transaction_id - b.transaction_id,
    width: '10vw',
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

async function getTableData(stringifiedQuery: string) {
  try {
    const res = await fetch('http://localhost:3001/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: stringifiedQuery
    })

    const data = await res.json();
    return data;
  } catch (err) {
    console.log('ERROR: ', err);
  }
}

function getColumns(data: { [key: string]: {} | string }) {
  let propertyArr = Object.getOwnPropertyNames(data);
  if (propertyArr.includes('location')) {
    propertyArr.splice(propertyArr.indexOf('location'), 1)
    propertyArr.push(...Object.getOwnPropertyNames(data.location))
  }
  let columns = [];

  propertyArr.forEach((el) => {
    columns.push({
      title: el,
      dataIndex: el
    })
  })

  return columns;
}

function getRows(data: { [key: string]: {} | string } []) {

  let finalRows = [];

  data.forEach((el, i) => {
    let propertyArr = Object.getOwnPropertyNames(el);
    if (propertyArr.includes('location')) {
      propertyArr.splice(propertyArr.indexOf('location'), 1)
      propertyArr.push(...Object.getOwnPropertyNames(el.location))
    }

    let newRow = {key: `${i}`};
    propertyArr.forEach(prop => {
      if(prop === 'date' || prop === 'time') {
        newRow = {
          ...newRow,
          [prop]: el[prop]
        } 
      } else {
        newRow = {
          ...newRow,
          [prop]: el.location[prop]
        } 
      }
    })

    finalRows.push(newRow);
  })

  return finalRows;
}


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

  /* STATE TO DISPLAY LOADING SPINNER ON THE TABLE */
  const [isLoading, setIsLoading] = useState(false);

  /* TABLE DATA */
  const [tableData, setTableData] = useState([{}]);
  /* TABLE COLUMNS */
  const [tableColumns, setTableColumns] = useState([{}]);

  useEffect(() => {
    // console.log(generateQuery(activePropertyFilter, activeTimeFilter));
    setIsLoading(true);
    getTableData(generateQuery(activePropertyFilter, activeTimeFilter))
      .then(res => {
        console.log('res', res[0])
        console.log('cols', getColumns(res[0]))
        console.log('rows', getRows(res))
        setTableColumns(getColumns(res[0]))
        setTableData(getRows(res))
      })
      .finally(() =>  setIsLoading(false))
  }, [activeTimeFilter, activePropertyFilter]);

  /* HANDLE FILTER CHANGE FROM SEGMENTED COMPONENT */
  function handleSegmentedChange(value: string) {
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
  function handleCustomRangeChange(dateArr: string[]) {
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
  function applyNewCustomTF() {
    if (previousTimeFilter[0] === null && previousTimeFilter[1] === null) setPreviousTimeFilter(activeTimeFilter);
    setActiveTimeFilter(customTimeFilter);
    setCustomTimeFilter([null, null]);
  }


  /* HANDLE NEW FILTER SELECTION */
  function handleCustomFiltersChange(filterArr: string[]) {
    setSelectedPropertyFilters(filterArr);
  }

  /* APPLY NEW CUSTOM FILTERS AS ACTIVE FILTERS */
  function applyNewCustomFilters() {
    setActivePropertyFilter(selectedPropertyFilters);
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
            treeCheckable={true}
            showCheckedStrategy={TreeSelect.SHOW_PARENT}
            treeLine={true}
            treeData={filters}
            onChange={(value) => handleCustomFiltersChange(value)}
          />
          <Button
            type='primary'
            style={{
              minWidth: "5vw",
              backgroundColor: JSON.stringify(selectedPropertyFilters) === JSON.stringify(activePropertyFilter) ? 'transparent' : '#1677ff',
              border: JSON.stringify(selectedPropertyFilters) === JSON.stringify(activePropertyFilter) ? '1px solid #1677ff' : 'none',
              color: JSON.stringify(selectedPropertyFilters) === JSON.stringify(activePropertyFilter) ? '#1677ff' : 'white',
            }}
            onClick={() => applyNewCustomFilters()}
          >Apply</Button>
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
          <Button type='primary'><PlusOutlined /></Button>
        </Tooltip>
      </div>
      <div className={styles.tableContainer}>
        {JSON.stringify(activeTimeFilter)}
        {JSON.stringify(activePropertyFilter)}
        <Table
          loading={isLoading}
          sticky={true}
          pagination={false}
          columns={tableColumns}
          dataSource={tableData}
        />
      </div>
    </div>
  )
}

export default ReportsView;