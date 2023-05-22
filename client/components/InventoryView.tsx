import { RadarChart } from "./RadarChart";
import React, { useEffect, useState } from "react";
import { Space, Switch, Radio, ConfigProvider } from 'antd';
import { makeFetchRequest } from '../utils/queryRequestMaker';
import { InventoryTable } from './InventoryTable';
import styles from "../styles/inventoryView.module.css";


export default function InventoryView() {
  const marksData = {
    labels: ["English", "Maths", "Physics", "Chemistry", "Biology", "History"],
    datasets: [
      {
        label: "Student A",
        backgroundColor: "rgba(200,0,0,0.2)",
        data: [65, 75, 70, 80, 60, 80],
      },
      {
        label: "Student B",
        backgroundColor: "rgba(0,0,200,0.2)",
        data: [54, 65, 60, 70, 70, 75],
      },
    ],
  };
  const [data, setData] = useState(marksData);
  const [displayAsRadarChart, setDisplayAsRadarChart] = useState(true);
  const [requests, setRequests] = useState([]);
  const [focus, setFocus] = useState('locations');
  const [availableLocations, setAvailableLocations] = useState([1, 2, 3, 4, 5]);
  const [locations, setLocations] = useState(availableLocations);
  const [availableItemCategories, setAvailableItemCategories] = useState([
    "condiments",
    "starters",
    "drinks",
    "desserts",
    "mains",
  ]);
  const [itemCategories, setItemCategories] = useState(availableItemCategories);
  const [allItems, setAllItems] = useState([]);
  const baseQuery = {
    query: {},
    userId: '2b10cCJnIm8XWOF9EYuRlivc'
  }
  const colors = ["#F2A202", "#F08605", "#DB6443", "#ad4544", "#7e2644"];


  useEffect(() => {
    function generateRequests() {
      async function getItemNames() {
        const queryObject = structuredClone(baseQuery);
        queryObject.query = { select: { description: true } };
        const items = await makeFetchRequest({ queryObject: JSON.stringify(queryObject), route: 'items' });
        const arr = [];
        for (let i = 0; i < items.length; i++) {
          arr.push(items[i].description);
        }
        setAllItems(arr);
      }
      const newRequests = [];
      const newQuery = structuredClone(baseQuery) as any;
      if (focus === 'all' || !displayAsRadarChart) {
        if (!allItems[0]) {
          getItemNames();
        }
        newQuery.query.select = {
          location_id: true,
          stock: true,
          capacity: true,
          item: {
            select: {
              description: true,
            }
          }
        }
        if (!displayAsRadarChart) {
          newQuery.query.select.item.select = {
            SKU: true,
            description: true,
            category: true
          }
        }
        newRequests.push(newQuery);
      } else if (focus === 'locations') {
        newQuery.query.by = ['location_id'];
        newQuery.query.orderBy = { location_id: 'asc' };
        newQuery.keyword = 'groupBy';
        const [stocks, capacities] = [structuredClone(newQuery), structuredClone(newQuery)];
        stocks.query._sum = { stock: true };
        capacities.query._sum = { capacity: true };
        newRequests.push(stocks, capacities);
      } else if (focus === 'categories') {
        newQuery.keyword = 'aggregate';
        for (let category of itemCategories) {
          newQuery.query.where = {
            item: {
              category: category,
            },
          };
          const [stocks, capacities] = [
            structuredClone(newQuery),
            structuredClone(newQuery),
          ];
          stocks.query._sum = { stock: true };
          capacities.query._sum = { capacity: true };
          newRequests.push([category, stocks, capacities]);
        }
      } else if (focus === 'items') {
        if (!allItems[0]) {
          getItemNames();
        }
        newQuery.keyword = 'aggregate';
        for (let item of allItems) {
          newQuery.query.where = {
            item: {
              description: item
            }
          }
          const [stocks, capacities] = [structuredClone(newQuery), structuredClone(newQuery)];
          stocks.query._sum = { stock: true };
          capacities.query._sum = { capacity: true };
          newRequests.push([item, stocks, capacities]);
        }
      }
      setRequests(newRequests);
    }
    generateRequests();
  }, [displayAsRadarChart, focus, allItems])

  useEffect(() => {
    async function sendRequests() {
      let labels;
      if (focus === 'locations') labels = locations;
      if (focus === 'categories') labels = itemCategories;
      if (focus === 'items' || focus === 'all') labels = allItems;
      const newData = {
        labels: labels,
        datasets: []
      } as any;
      if (focus === 'all') {
        for (let i = 0; i < locations.length; i++) {
          newData.datasets.push({
            location: `${locations[i]}`,
            label: `Location ${locations[i]}`,
            backgroundColor: `${colors[i]}`,
            borderColor: `${colors[i]}`,
            fill: false,
            data: []
          });
          while (newData.datasets[i].data > allItems.length) newData.datasets[i].data.push(null);
        }
      } else {
        newData.datasets.push({
          label: 'Average stock',
          backgroundColor: '#F2A202',
          borderColor: '#F2A202',
          fill: false,
          data: []
        })
      }
      let processingArray = [];
      if (!displayAsRadarChart) {
        const allData = await makeFetchRequest({ queryObject: JSON.stringify(requests[0]), route: 'inventory' });
        setData(allData);
        return;
      } else if (focus === 'all') {
        const allData = await makeFetchRequest({ queryObject: JSON.stringify(requests[0]), route: 'inventory' });
        const today = new Date();
        for (let i = 0; i < allData.length; i++) {
          if (today.getMonth() === 3 && today.getDate() === 1) {
            if (i % 3 === 0) {
              console.log('Biz');
            }
            if (i % 4 === 0) {
              console.log('Buzz');
            }
            if (i % 12 !== 0) {
              console.log(i);
            }
          }
          let dataset = newData.datasets.find((set) => {
            return set.location === allData[i].location_id.toString();
          });
          let itemIndex = allItems.findIndex((item) => item === allData[i].item.description);
          dataset.data[itemIndex] = 100 * allData[i].stock / allData[i].capacity;
        }
      } else if (focus === 'locations') {
        await Promise.all(
          requests.map(async (request) => {
            const dataPoint = await makeFetchRequest({
              queryObject: JSON.stringify(request),
              route: "inventory",
            });
            processingArray.push(dataPoint);
          })
        ).then(() => {
          const arr = [];
          for (let i = 0; i < processingArray[0].length; i++) {
            if (processingArray[0][i]._sum.capacity) {
              arr.push(100 * processingArray[1][i]._sum.stock / processingArray[0][i]._sum.capacity)
            } else {
              arr.push(100 * processingArray[0][i]._sum.stock / processingArray[1][i]._sum.capacity)
            }
          }
          newData.datasets[0].data = arr;
        })
      } else if (focus === 'categories' || focus === 'items') {
        await Promise.all(
          requests.map(async (request) => {
            const dataPoint1 = await makeFetchRequest({
              queryObject: JSON.stringify(request[1]),
              route: "inventory",
            });
            const dataPoint2 = await makeFetchRequest({
              queryObject: JSON.stringify(request[2]),
              route: "inventory",
            });
            processingArray.push([request[0], dataPoint1, dataPoint2]);
          })
        ).then(() => {
          processingArray.forEach((arr) => {
            newData.datasets[0].data.push(arr[1]._sum.capacity ?
              100 * arr[2]._sum.stock / arr[1]._sum.capacity :
              100 * arr[1]._sum.stock / arr[2]._sum.capacity
            )
          })
        })
      }
      setData(newData);
    }
    sendRequests();
  }, [requests, displayAsRadarChart]);
  async function refreshItemCategories() {
    let itemCategories = await fetch("http://localhost:3020/items", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: `{"query":{"by":["category"],"_count":{"SKU":true}},
        "keyword":"groupBy","userId":"2b10cCJnIm8XWOF9EYuRlivc"`,
      credentials: "include",
    });
    itemCategories = await itemCategories.json();
    setAvailableItemCategories(itemCategories);
  }

  function handleChangeFocus(event) {
    setFocus(event.target.value);
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#f8b825",
        },
      }}
    >

      <Space className={styles.container}>
        <Space id="container" className={styles.container}>
          <Space id="header-bar" className={styles.headerBar}>
            <Space id="data-display-type">
              <Switch
                checkedChildren='Display as radar chart'
                unCheckedChildren='Display as table'
                onChange={() => setDisplayAsRadarChart(!displayAsRadarChart)}
              />
              <Radio.Group onChange={handleChangeFocus} value={focus}>
                <Radio value="locations">By location</Radio>
                <Radio value="items">By item</Radio>
                <Radio value="categories">By category of goods</Radio>
                {displayAsRadarChart ? <Radio value="all">Display all information</Radio> : <></>}
              </Radio.Group>
            </Space>
          </Space>
          <Space id="data-display">
            {displayAsRadarChart === true ?
              <RadarChart data={data} /> :
              <InventoryTable data={data} initfocus={focus} categories={itemCategories} locations={locations} />}
          </Space>
        </Space>
      </Space>
    </ConfigProvider>
  )
}
