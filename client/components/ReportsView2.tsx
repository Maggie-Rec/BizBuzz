'use client';

import styles from '../styles/ReportsView2.module.css';
import { Cascader, Segmented, DatePicker, Table, Tooltip, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { todayTimeFilter, lastWeekTF, lastMonthTF, lastQuarterTF, lastYearTF } from '../utils/timeFilters';
const { RangePicker } = DatePicker;

const ReportsView2 = () => {

  /* TIME FILTER */
  const [timeFilter, setTimeFilter] = useState(todayTimeFilter as Date[] | null[]);
  /* TIME FILTER VALUE BEFORE APPLYING CUSTOM DATE RANGE */
  const [previousTimeFilter, setPreviousTimeFilter] = useState([null, null] as Date[] | null[]);
  /* FLAG TO ENABLE/DISABLE SEGMENTED TIME FILTER */
  const [customDateRange, setCustomDateRange] = useState(false);
  /* PROPERTY FILTER (for table columns) */
  const [propertyFilter, setPropertyFilter] = useState([] as string[]);

  /* STATE TO DISPLAY LOADING SPINNER ON THE TABLE */
  const [isTableLoading, setIsTableLoading] = useState(false);

  useEffect(() => {

  }, [timeFilter, propertyFilter]);

  /* HANDLE SELECT/REMOVE FROM THE FILTERS */
  function handleNewProperty(propertyArr: string[]) {
    setPropertyFilter(propertyArr);
  }

  /* HANDLE NEW DATE RANGE FROM RANGE PICKER */
  function handleNewDateRange(dateArr: string[]) {
    if (dateArr[0] === '' && dateArr[1] === '') {
      setCustomDateRange(false);
      setTimeFilter(previousTimeFilter);
      setPreviousTimeFilter([null, null]);
    } else {
      setCustomDateRange(true);
      const newDateRange = [new Date(dateArr[0]), new Date(dateArr[1])];
      setPreviousTimeFilter(timeFilter);
      setTimeFilter(newDateRange);
    }
  }

  function handleSegmentedChange(value: string) {
    switch (value) {
      case 'Today':
        setTimeFilter(todayTimeFilter);
        break;
      case 'Last Week':
        setTimeFilter(lastWeekTF);
        break;
      case 'Last Month':
        setTimeFilter(lastMonthTF);
        break;
      case 'Last Quarter':
        setTimeFilter(lastQuarterTF);
        break;
      case 'Last Year':
        setTimeFilter(lastYearTF);
        break;
      case 'All Time':
        setTimeFilter([new Date(''), new Date('')]);
        break;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <Cascader
          style={{ width: '25vw' }}
          placeholder='Select Filters'
          multiple
          options={[{
            value: 'test',
            label: 'Test'
          }, {
            value: 'test2',
            label: 'Test2'
          }]}
          onChange={(value) => handleNewProperty(value as unknown as string[])}
        />
        <Segmented
          options={['Today', 'Last Week', 'Last Month', 'Last Quarter', 'Last Year', 'All Time']}
          disabled={customDateRange}
          onChange={(value) => handleSegmentedChange(value as string)}
        />
        <RangePicker
          style={{ width: '15vw' }}
          onChange={(value, strArr) => handleNewDateRange(strArr)}
        />
        <Tooltip title='Upload Data' placement='bottomLeft'>
          <Button type='primary'><PlusOutlined /></Button>
        </Tooltip>
      </div>
      <div className={styles.tableContainer}>
        <Table
          bordered
        />
      </div>
    </div>
  )
}

export default ReportsView2;