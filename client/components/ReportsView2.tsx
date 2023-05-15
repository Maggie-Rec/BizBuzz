'use client';

import styles from '../styles/ReportsView2.module.css';
import { Cascader, Segmented, DatePicker, Table, Tooltip, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ReactNode, useEffect, useState } from 'react';
import { todayTimeFilter, lastWeekTF, lastMonthTF, lastQuarterTF, lastYearTF } from '../utils/timeFilters';
const { RangePicker } = DatePicker;
const { SHOW_CHILD, SHOW_PARENT } = Cascader;

import { generateQuery } from '../utils/queryKing';
import { queryAllLocations, queryAllItems, queryAllCustomers } from '../utils/queryKingV2';

interface IColumn {
  title: string,
  dataIndex: string,
  width?: string,
  maxWidth?: string,
  align?: string,
  sorter?: (a, b) => number,
  render?: (el) => ReactNode
}

interface IFilter {
  value: string,
  label: string,
  children?: IFilter[]
}

interface ILocation {
  id: number,
  name: string,
  full_address: string,
  region: string,
  city: string,
  type: string
}

interface IItem {
  SKU: string,
  category: string,
  description: string,
  price_no_tax: string,
  unit_of_measurement: string
}

interface ICustomer {
  id: number,
  name: string,
  age: number,
  email: string,
  gender: string
}

// FILTER ORDER
// --> All Locations
// --> All Items
// --> All Customers
// --> Members
// --> Date
// --> Time
// --> Quantity
// --> Tax Rate
// --> Total

async function fecthAPI (stringifiedQuery: string, where: string) {
  try {
    const res = await fetch(`http://localhost:3001/${where}`, {
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

async function generateTableFilters () {

  // INITIAL EMPTY FILTER OBJECT
  let tableFilters: IFilter[] = [];

  // QUERYING POSSIBLE LOCATIONS FROM DB AND ADDING THEM AS FILTERS
  tableFilters.push({value: 'location_id', label: 'All Locations', children: []});
  const locations: ILocation[] = await fecthAPI(queryAllLocations(), 'locations');
  locations.forEach(location => {
    tableFilters[0].children.push({
      value: `location_id:${location.id}`,
      label: location.name
    })
  })

  // QUERYING POSSIBLE ITEMS FROM DB AND ADDING THEM AS FILTERS
  tableFilters.push({value: 'SKU', label: 'All Items', children: []});
  const items: IItem[] = await(fecthAPI(queryAllItems(), 'items'));
  items.forEach(item => {
    tableFilters[1].children.push({
      value: `SKU:${item.SKU}`,
      label: item.description
    })
  })

  // QUERYING POSSIBLE CUSTOMERS FROM DB AND ADDING THEM AS FILTERS
  tableFilters.push({value: 'customer_id', label: 'All Customers', children: [{value: 'is_member:true', label: 'Only Members', children: []}, {value: 'is_member:false', label: 'Non Members', children: []}]});
  const customers: ICustomer[] = await(fecthAPI(queryAllCustomers(), 'customers'));
  customers.forEach(customer => {
    tableFilters[2].children.push({
      value: `customer_id:${customer.id}`,
      label: customer.name
    })
  })

  // ADD SELECTABLE COLUMNS
  tableFilters.push({value: 'all_columns', label: 'All Columns', children: []})
  // ADD DIFERENT OPTIONS OF COLUMNS TO SHOW
  tableFilters[3].children.push(
    {
      value: 'date',
      label: 'Display Date',
    },
    {
      value: 'time',
      label: 'Display Time',
    },
    {
      value: 'quantity',
      label: 'Display Quantity',
    },
    {
      value: 'tax',
      label: 'Display Tax Rate',
    },
    {
      value: 'total_with_tax',
      label: 'Display Total Amount',
    }
  )

  return tableFilters;
}

function generateTableColumns (data: { [key: string]: {} | string }) {
  console.log(data);

  let propertyArr = Object.getOwnPropertyNames(data);

  if (propertyArr.includes('location')) {
    propertyArr.splice(propertyArr.indexOf('location'), 1)
    propertyArr.push(...Object.getOwnPropertyNames(data.location))
  }
  if (propertyArr.includes('SKU')) {
    propertyArr.splice(propertyArr.indexOf('SKU'), 1)
    propertyArr.push(...Object.getOwnPropertyNames(data.SKU))
  }


  let columns: IColumn[] = [{
    title: 'ID',
    dataIndex: 'record_id',
    width: '8%',
    align: 'center',
    sorter: (a, b) => b.record_id - a.record_id
  }];

  propertyArr.forEach((el) => {
    if (el !== 'record_id' && el !== 'total_with_tax' && el !== 'key') {
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

const ReportsView2 = () => {

  /* TIME FILTER */
  const [timeFilter, setTimeFilter] = useState(todayTimeFilter as Date[] | null[]);
  /* TIME FILTER VALUE BEFORE APPLYING CUSTOM DATE RANGE */
  const [previousTimeFilter, setPreviousTimeFilter] = useState([null, null] as Date[] | null[]);
  /* FLAG TO ENABLE/DISABLE SEGMENTED TIME FILTER */
  const [customDateRange, setCustomDateRange] = useState(false);
  /* PROPERTY FILTER (for table columns) */
  const [propertyFilter, setPropertyFilter] = useState([] as string[]);

  /* SELECTABLE FILTERS FROM DROPDOWN */
  const [selectableFilters, setSelectableFilters] = useState([] as IFilter[]);
  /* TABLE DATA */
  const [tableData, setTableData] = useState([] as {[key: string]: any}[])
  /* TABLE COLUMNS */
  const [tableColumns, setTableColumns] = useState([]);

  /* STATE TO DISPLAY LOADING SPINNER ON THE TABLE */
  const [isTableLoading, setIsTableLoading] = useState(false);

  useEffect(() => {
    console.log(generateQuery(propertyFilter, timeFilter));
    fecthAPI(generateQuery(propertyFilter, timeFilter), 'transactions')
      .then(res => {
        if (res && res.length > 0) {
          res.map((el, i) => el['key'] = i)
          setTableColumns(generateTableColumns(res[0]));
          setTableData(res);
        }
      })
    // console.log(generateQuery(propertyFilter, timeFilter));
  }, [timeFilter, propertyFilter]);

  useEffect(() => {
    generateTableFilters()  
      .then(filters => setSelectableFilters(filters));
  }, []);

  /* HANDLE SELECT/REMOVE FROM THE FILTERS */
  function handleNewProperty(propertyArr: string[]) {
    setPropertyFilter(propertyArr.flat());
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
          maxTagCount="responsive"
          showCheckedStrategy={SHOW_PARENT}
          options={selectableFilters}
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
          pagination={{
            position: ['bottomCenter'],
            defaultPageSize: 50
          }}
          scroll={{
            y: "70vh",
          }}
          dataSource={tableData}
          columns={tableColumns}
        />
      </div>
    </div>
  )
}

export default ReportsView2;