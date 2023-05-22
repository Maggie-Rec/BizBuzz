import { Table } from 'antd';

import { useEffect, useState } from 'react';


export function InventoryTable({ data, initfocus, locations, categories }) {
  const [focus, setFocus] = useState(initfocus);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setFocus(initfocus);
  }, [initfocus])

  useEffect(() => {
    function column(title, key) {
      return {
        title: title,
        dataIndex: key,
        key: key
      }
    }
    let newColumns;
    if (focus === 'locations') {
      newColumns = [
        column("Location", 'location'),
        column("Total", 'total')
      ];
      for (let category of categories) {
        newColumns.push(column(category, category));
      }
    } else {
      if (focus === "items") {
        newColumns = [
          column('Item', 'item'),
          column('SKU', 'SKU'),
          column("Total", 'total')
        ]
      } else if (focus === 'categories') {
        newColumns = [
          column('Category', 'category'),
          column("Total", 'total')
        ]
      }
      for (let location of locations) {
        newColumns.push(column(location, location));
      }
    }
    setColumns(newColumns);
  }, [focus])
  const stageOneData = [];
  const processedData = [];
  if (data[25]) {
    let mainKey;
    let secondKey;
    let columnSetter;

    if (focus === 'locations') {
      mainKey = 'location_id';
      secondKey = null;
      columnSetter = categories;
    } else if (focus === 'categories') {
      mainKey = 'item';
      secondKey = 'category'
      columnSetter = locations;
    } else if (focus === 'items') {
      mainKey = 'item';
      secondKey = 'SKU'
      columnSetter = locations;
    }
    for (let dataPoint of data) {
      const existingRow = stageOneData.find((row) => {
        if (secondKey) return row.key === dataPoint[mainKey][secondKey];
        return row.key === dataPoint[mainKey];
      });
      let newRow;
      if (!existingRow) {
        newRow = {
          key: (secondKey ? dataPoint[mainKey][secondKey] : dataPoint[mainKey])
        };
        if (focus === 'items') newRow.description = dataPoint.item.description;
        for (let el of columnSetter) {
          newRow[el] = {
            allStocks: [],
            allCapacities: [],
          }
        }
      }
      const row = (existingRow ? existingRow : newRow);
      if (row === newRow) stageOneData.push(row);

      if (secondKey) {
        row[dataPoint.location_id].allStocks.push(dataPoint.stock);
        row[dataPoint.location_id].allCapacities.push(dataPoint.capacity);
      } else {
        row[dataPoint.item.category].allStocks.push(dataPoint.stock);
        row[dataPoint.item.category].allCapacities.push(dataPoint.capacity);
      }
    }

    for (let row of stageOneData) {
      let newRow;
      let colHeads;
      if (focus === 'locations') {
        newRow = {
          key: row.key,
          location: row.key,
        };
        colHeads = categories;
      } else if (focus === 'categories') {
        newRow = {
          key: row.key,
          category: row.key,
        };
        colHeads = locations;
      } else if (focus === 'items') {
        newRow = {
          key: row.key,
          item: row.description,
          SKU: row.key
        };
        colHeads = locations;
      }
      let rowSum = 0;
      for (let el of colHeads) {
        let columnSum = 0;
        for (let i = 0; i < row[el].allStocks.length; i++) {
          columnSum += row[el].allStocks[i] / row[el].allCapacities[i];
        }
        newRow[el] = (100 * columnSum / row[el].allStocks.length).toFixed(2);
        rowSum += +newRow[el];
      }
      newRow.total = (rowSum / categories.length).toFixed(3);
      processedData.push(newRow);
    }
  }

  return (
    <>
      <Table
        dataSource={processedData}
        columns={columns}
      />
    </>
  )
}