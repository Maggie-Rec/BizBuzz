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
import { SizeType } from 'antd/es/config-provider/SizeContext';

interface IColumn {
  title: string,
  dataIndex: string,
  width?: string,
  maxWidth?: string,
  align?: string,
  fixed?: string,
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
    }
  )

  return tableFilters;
}

function generateTableColumns (data: { [key: string]: {} | string }) {
  // console.log(data);

  let propertyArr = Object.getOwnPropertyNames(data);

  if (propertyArr.includes('location')) {
    propertyArr.splice(propertyArr.indexOf('location'), 1)
    propertyArr.push(...Object.getOwnPropertyNames(data.location))
  }

  // if (propertyArr.includes('SKU')) {
  //   propertyArr.splice(propertyArr.indexOf('SKU'), 1)
  //   propertyArr.push(...Object.getOwnPropertyNames(data.SKU))
  // }

  if (propertyArr.includes('item')) {
    propertyArr.splice(propertyArr.indexOf('item'), 1)
    propertyArr.push(...Object.getOwnPropertyNames(data.item))
  }

  if (propertyArr.includes('customer')) {
    propertyArr.splice(propertyArr.indexOf('customer'), 1)
    propertyArr.push(...Object.getOwnPropertyNames(data.customer))
  }


  let columns: IColumn[] = [{
    title: 'ID',
    dataIndex: 'record_id',
    width: '6%',
    align: 'center',
    fixed: 'left',
    sorter: (a, b) => b.record_id - a.record_id,
    render: (el) => <p style={{fontWeight: 'bold'}}>{el}</p>
  }];

  propertyArr.forEach((el) => {
    if (el !== 'record_id' && el !== 'total_with_tax' && el !== 'key' && el !== 'is_member') {
      columns.push({
        title: el.charAt(0).toUpperCase() + el.slice(1),
        dataIndex: el,
        width: '10%',
        align: 'center',
        render: el === 'tax' ? (el) => el + '%' : (el) => el
      })
    }
  })

  columns.push({
    title: '',
    dataIndex: '',
    maxWidth: '100%'
  })

  columns.push({
    title: 'Total',
    dataIndex: 'total_with_tax',
    width: '8%',
    align: 'center',
    fixed: 'right',
    sorter: (a, b) => b.total_with_tax - a.total_with_tax,
    render: (el) => <p style={{fontWeight: 'bold'}}>{el}£</p>
  })


  return columns;
}

function generateTableRows (data: { [key: string]: {} | string }[]) {
  const resultingRows = [];

  data.forEach((el, i) => {
    let propertyArr = Object.getOwnPropertyNames(el);

    let newRow = { key: `${i}` } as {[key: string]: any}
    propertyArr.forEach(prop => {
      switch(prop) {
        case 'customer':
        case 'location':
        case 'item':
          let keys = Object.keys(el[prop])
          keys.forEach(key => {
            newRow = {
              ...newRow,
              [key]: el[prop][key]
            }
          })
          break;
        case 'date':
          newRow = {
            ...newRow,
            [prop]: (new Date(el[prop].toString())).toLocaleDateString("en-UK")
          }
          break;
          case 'time':
            newRow = {
              ...newRow,
              [prop]: (new Date(el[prop].toString())).toLocaleTimeString("en-UK")
            }
            break;
        default:
          newRow = {
            ...newRow,
            [prop]: el[prop]
          }
        break;
      }
    })

    resultingRows.push(newRow)
  })
  return resultingRows;
}

const ReportsView2 = () => {

  /* TIME FILTER */
  const [timeFilter, setTimeFilter] = useState(todayTimeFilter as Date[] | null[]);
  /* TIME FILTER VALUE BEFORE APPLYING CUSTOM DATE RANGE */
  const [previousTimeFilter, setPreviousTimeFilter] = useState([null, null] as Date[] | null[]);
  /* FLAG TO ENABLE/DISABLE SEGMENTED TIME FILTER */
  const [customDateRange, setCustomDateRange] = useState(false);
  /* PROPERTY FILTER (for table columns) */
  const [propertyFilter, setPropertyFilter] = useState(['date', 'time'] as string[]);

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
          // setTableData(res);
          setTableData(generateTableRows(res))
        } else {setTableData([]); setTableColumns([])}
      })
  }, [timeFilter, propertyFilter]);

  useEffect(() => {
    generateTableFilters()  
      .then(filters => setSelectableFilters(filters));
  }, []);

  /* HANDLE SELECT/REMOVE FROM THE FILTERS */
  function handleNewProperty(propertyArr: string[]) {
    let filteredArr = propertyArr.map(el => el.length === 2 ? el[1] : el)
    if (filteredArr.length > 0) filteredArr.push(filteredArr[0].split(':')[0]);
    setPropertyFilter(filteredArr.flat());
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
          showSearch={true}
          maxTagCount="responsive"
          defaultValue={[['all_columns', 'date'], ['all_columns', 'time']]}
          showCheckedStrategy={SHOW_CHILD}
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
          size='small'
          pagination={{
            position: ['bottomCenter'],
            defaultPageSize: 50
          }}
          scroll={{
            y: "75vh",
            x: "1300"
          }}
          dataSource={tableData}
          columns={tableColumns}
        />
      </div>
    </div>
  )
}

export default ReportsView2;