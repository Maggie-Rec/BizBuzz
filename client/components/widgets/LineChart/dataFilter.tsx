import { Space, Select, InputNumber } from 'antd';
import { useState } from 'react';

export const DataFilter = ({ isLast }: { isLast: boolean }) => {
  const filterOptions = [
    { value: "location", label: "Location" }, // Filter should be a multi-select with search
    { value: "gender", label: "Gender" }, // Filter should be a multi-select with search
    { value: "region", label: "Location Region" }, // Filter should be a multi-select with search
    { value: "quantity", label: "Item Quantity" }, // Filters should be min and max
    { value: "age", label: "Age" }, // Filters should be min and max
    { value: "member", label: "Membership" }, // Filter should be member or no
    { value: "category", label: "Item Category" }, // Filter should be write-in
    // { value: "tax", label: "Tax" },
    // { value: "units", label: "Units" },
  ];
  const multiSelectFilters = {
    location: ['Mock location 0', 'Mock location 1', 'Mock location 2', 'Mock location 3', 'Mock location 4'],
    gender: ['Male', 'Female', 'Agender', 'Genderqueer', 'Bigender', 'anonymous', 'Genderfluid', 'Non-binary', 'Polygender'],
    region: ['Greater London', 'Manchester', 'Falmouth']
  }
  const [filter, setFilter] = useState(filterOptions[5].value);
  const [filterSecondOptions, setFilterSecondOption] = useState(multiSelectFilters[0])
  const [secondFilter, setSecondFilter] = useState() as any;
  function handleFirstFilterChange(value: string) {
    setFilter(value);
    setFilterSecondOption(multiSelectFilters[value]);
  }


  return (
    <>
      <Space />
      <p>{isLast ? "Filter:" : "Filtering by"}</p>
      <Select
        defaultValue={filterOptions[5].value}
        style={{ width: 120 }}
        onChange={handleFirstFilterChange}
        // className={styles.input}
        value={filter}
        options={filterOptions}
      />
      {filter === 'location' || filter === 'gender' || filter === 'region' ?
        <Select
          options={filterSecondOptions}
          onChange={setSecondFilter}
        />
        :
        <></>
      }
      {filter === 'quantity' || filter === 'age' ?
        <InputNumber
          min={0}
          max={100}
        />
        :
        <></>

      }

    </>
  )
}