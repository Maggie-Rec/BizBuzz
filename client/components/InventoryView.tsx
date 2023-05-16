import { RadarChart } from './RadarChart';
import React, { useEffect, useState } from "react";
import { Button, Space, Switch } from 'antd';
import { generateAggSumQuery } from '../utils/aggregateSumQueries';
import { setDatasets } from 'react-chartjs-2/dist/utils';
import { makeFetchRequest } from '../utils/queryRequestMaker';

export default function InventoryView() {
  const marksData = {
    labels: ["English", "Maths", "Physics", "Chemistry", "Biology", "History"],
    datasets: [{
      label: "Student A",
      backgroundColor: "rgba(200,0,0,0.2)",
      data: [65, 75, 70, 80, 60, 80]
    }, {
      label: "Student B",
      backgroundColor: "rgba(0,0,200,0.2)",
      data: [54, 65, 60, 70, 70, 75]
    }]
  };
  const [data, setData] = useState(marksData);
  const [displayAsRadarChart, setDisplayAsRadarChart] = useState(true);
  const [requests, setRequests] = useState([]);
  const [focusOnLocations, setFocusOnLocations] = useState(true);
  const [availableLocations, setAvailableLocations] = useState([1, 2, 3, 4, 5]);
  const [locations, setLocations] = useState(availableLocations);
  const [availableItemCategories, setAvailableItemCategories] = useState(['condiments', 'starters', 'drinks', 'desserts', 'mains']);
  const [itemCategories, setItemCategories] = useState(availableItemCategories);
  const baseQuery = {
    query: {},
    userId: '2b10cCJnIm8XWOF9EYuRlivc'
  }

  useEffect(() => {
    function generateRequests() {
      const newRequests = [];
      const newQuery = structuredClone(baseQuery) as any;
      if (focusOnLocations) {
        newQuery.query.by = ['location_id'];
        newQuery.query.orderBy = { location_id: 'asc' };
        newQuery.keyword = 'groupBy';
        const [stocks, capacities] = [structuredClone(newQuery), structuredClone(newQuery)];
        stocks.query._sum = { stock: true };
        capacities.query._sum = { capacity: true };
        newRequests.push(stocks, capacities);
      } else {
        newQuery.keyword = 'aggregate';
        for (let category of itemCategories) {
          newQuery.query.where = {
            item: {
              category: category
            }
          }
          const [stocks, capacities] = [structuredClone(newQuery), structuredClone(newQuery)];
          stocks.query._sum = { stock: true };
          capacities.query._sum = { capacity: true };
          newRequests.push([category, stocks, capacities]);
        }
      }
      setRequests(newRequests);
    };
    generateRequests();
  }, [displayAsRadarChart, focusOnLocations])

  useEffect(() => {
    async function sendRequests() {
      const newData = {
        // labels: (focusOnLocations ? locations : itemCategories),
        datasets: [{
          label: 'Average stock',
          backgroundColor: '#F2A202',
          data: []
          // }, {
          //   label: 'Lowest stock',
          //   backgroundColor: '#DB6443',
          //   data: []
        }]
      } as any;
      if (focusOnLocations) {
        newData.labels = locations;
      } else {
        newData.labels = itemCategories;
      }
      let processingArray = [];
      if (focusOnLocations) {
        await Promise.all(
          requests.map(async (request) => {
            const dataPoint = await makeFetchRequest({ queryObject: JSON.stringify(request), route: 'inventory' });
            processingArray.push(dataPoint);
          })
        ).then(() => {
          const arr = [];
          for (let i = 0; i < processingArray[0].length; i++) {
            if (processingArray[0]._sum.capacity) {
              arr.push(100 * processingArray[1]._sum.stock / processingArray[0]._sum.capacity)
            } else {
              arr.push(100 * processingArray[0]._sum.stock / processingArray[1]._sum.capacity)
            }
          }
          newData.datasets[0].data = arr;
        })
      } else {
        await Promise.all(
          requests.map(async (request) => {
            const dataPoint1 = await makeFetchRequest({ queryObject: JSON.stringify(request[1]), route: 'inventory' });
            const dataPoint2 = await makeFetchRequest({ queryObject: JSON.stringify(request[2]), route: 'inventory' });
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
    sendRequests()
  }, [requests]);
  async function refreshItemCategories() {
    let itemCategories = await fetch('http://localhost:3020/items', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: `{"query":{"by":["category"],"_count":{"SKU":true}},
        "keyword":"groupBy","userId":"2b10cCJnIm8XWOF9EYuRlivc"`,
      credentials: "include"
    })
    itemCategories = await itemCategories.json();
    setAvailableItemCategories(itemCategories);
  }

  return (
    <section id="container">
      <section id="header-bar">
        <section id="data-display-type">
          <Switch
            checkedChildren='Display as radar chart'
            unCheckedChildren='Display as table'
            onChange={() => setDisplayAsRadarChart(!displayAsRadarChart)}
          />
          {displayAsRadarChart ?
            <Switch
              checkedChildren='Focus on locations'
              unCheckedChildren='Focus on items'
              onChange={() => setFocusOnLocations(!focusOnLocations)}
            /> : <></>}
        </section>
      </section>
      <section id="data-display">
        {displayAsRadarChart === true ?
          <RadarChart data={data} /> :
          <></>}
      </section>
    </section>
  )
}