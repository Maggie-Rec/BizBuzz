'use client';

import styles from '../styles/ReportsView.module.css';
import React, { ReactNode, use, useEffect, useState } from 'react';
import { Button, Segmented, DatePicker, TreeSelect, Table, Tooltip, Tree } from 'antd';
import { todayTimeFilter, lastWeekTF, lastMonthTF, lastQuarterTF, lastYearTF } from '../utils/timeFilters';
import { PlusOutlined } from '@ant-design/icons';
import { filters } from '../utils/filters';
import { generateQuery } from '../utils/queryKing';
const { RangePicker } = DatePicker;

interface IColumn {
  title: string,
  dataIndex: string,
  maxWidth?: string,
  width?: string,
  align?: string,
  sorter?: (a, b) => number,
  render?: (el) => ReactNode
}

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
  let columns: IColumn[] = [{
    title: 'ID',
    dataIndex: 'record_id',
    width: '8%',
    align: 'center',
    sorter: (a, b) => b.record_id - a.record_id
  }];

  propertyArr.forEach((el) => {
    if (el !== 'record_id' && el !== 'total_with_tax') {
      columns.push({
        title: el.charAt(0).toUpperCase() + el.slice(1),
        dataIndex: el,
        width: '15%',
        align: 'center',
      })
    }
  })

  columns.push({
    title: '',
    dataIndex: '',
    maxWidth: '84%'
  })

  columns.push({
    title: 'Total',
    dataIndex: 'total_with_tax',
    width: '8%',
    align: 'center',
    sorter: (a, b) => b.total_with_tax - a.total_with_tax,
    render: (el) => el + '£'
  })


  return columns;
}

function getRows(data: { [key: string]: {} | string }[]) {

  let finalRows = [];

  data.forEach((el, i) => {
    let propertyArr = Object.getOwnPropertyNames(el);
    if (propertyArr.includes('location')) {
      propertyArr.splice(propertyArr.indexOf('location'), 1)
      propertyArr.push(...Object.getOwnPropertyNames(el.location))
    }

    let newRow = { key: `${i}` };
    propertyArr.forEach(prop => {
      if (prop === 'date' || prop === 'time' || prop === 'record_id' || prop === 'total_with_tax') {
        newRow = {
          ...newRow,
          [prop]: `${prop === 'date'
            ? (new Date(el[prop].toString())).toLocaleDateString("en-UK")
            : prop === 'time'
              ? (new Date(el[prop].toString())).toLocaleTimeString("en-UK")
              : el[prop]}`
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
  const [tableData, setTableData] = useState([]);
  /* TABLE COLUMNS */
  const [tableColumns, setTableColumns] = useState([]);

  useEffect(() => {
    // console.log(generateQuery(activePropertyFilter, activeTimeFilter));
    setIsLoading(true);
    getTableData(generateQuery(activePropertyFilter, activeTimeFilter))
      .then(res => {
        if (res.length > 0) {
          setTableColumns(getColumns(res[0]))
          setTableData(getRows(res))
        } else {
          setTableData([])
        }
      })
      .finally(() => setIsLoading(false))
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
    if (filterArr.length !== 0) {
      setSelectedPropertyFilters(filterArr);
    } else {
      setSelectedPropertyFilters(filterArr);
      setActivePropertyFilter(filterArr);
    }
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
          {JSON.stringify(selectedPropertyFilters) !== JSON.stringify(activePropertyFilter) &&
            <Button
              type='primary'
              style={{minWidth: "5vw"}}
              onClick={() => applyNewCustomFilters()}
            >Apply</Button>
          }
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
        <Table
          loading={isLoading}
          sticky={true}
          pagination={{
            position: ['bottomCenter'],
            defaultPageSize: 50
          }}
          scroll={{
            y: "72vh",
          }}
          columns={tableColumns}
          dataSource={tableData}
          bordered
        />
      </div>
    </div>
  )
}

export default ReportsView;