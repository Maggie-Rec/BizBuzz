import { Space, Select, Slider, Input } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const DataFilter = ({ filter }) => {
  const dispatch = useDispatch();
  const filterOptions = {
    location: {
      value: "location", label: "Location", baseFilterObject: { location: 0 },
      options: [
        { value: 0, label: 'Mock location 0' },
        { value: 1, label: 'Mock location 1' },
        { value: 2, label: 'Mock location 2' },
        { value: 3, label: 'Mock location 3' },
        { value: 4, label: 'Mock location 4' }
      ]
    },
    quantity: { value: "quantity", label: "Item Quantity", baseFilterObject: { quantity: { gt: 0, lt: 100 } } },
    gender: {
      value: "gender", label: "Gender", baseFilterObject: { gender: [] },
      options: [
        { value: 'Agender', label: 'Agender' },
        { value: 'Bigender', label: 'Bigender' },
        { value: 'Female', label: 'Female' },
        { value: 'Genderfluid', label: 'Genderfluid' },
        { value: 'Genderqueer', label: 'Genderqueer' },
        { value: 'Male', label: 'Male' },
        { value: 'Non-binary', label: 'Non-binary' },
        { value: 'Polygender', label: 'Polygender' }
      ]
    },
    region: {
      value: "region", label: "Location Region", baseFilterObject: { region: [] },
      options: [
        { value: 'Greater London', label: 'Greater London' },
        { value: 'Manchester', label: 'Manchester' },
        { value: 'Falmouth', label: 'Falmouth' }
      ]
    },
    age: { value: "age", label: "Age", baseFilterObject: { quantity: { gt: 0, lt: 100 } } },
    is_member: {
      value: "is_member", label: "Membership", baseFilterObject: { is_member: true },
      options: [{ value: true, label: 'Customer is member' },
      { value: false, label: 'Customer is not member' }]
    },
    category: { value: "category", label: "Item Category", baseFilterObject: { category: '' } }
  }

  const [filterQueryObject, setFilterQueryObject] = useState(filterOptions[filter].baseFilterObject);
  useEffect(() => {
    dispatch({
      type: 'ADD_FILTER',
      payload: { filter, obj: filterQueryObject }
    });
  }, [filterQueryObject])

  return (
    <>
      <p>Filtering for {filter}</p>
      {filter === 'location' || filter === 'region' || filter === 'is_member' || filter === 'gender' ?
        <Select
          mode="multiple"
          options={filterOptions[filter].options}
          style={{ width: 200 }}
          onChange={(value) => {
            const copyFilterObject = { ...filterQueryObject };
            copyFilterObject[filter] = value;
            setFilterQueryObject(copyFilterObject);
          }}
        />
        : <p>{filter}</p>}
      {
        filter === 'age' || filter === 'quantity' ?
          <Slider
            range
            defaultValue={[18, 65]}
            style={{ width: 200 }}
            onChange={(value) => {
              const copyFilterObject = { ...filterQueryObject };
              copyFilterObject[filter] = value;
              setFilterQueryObject(copyFilterObject);
            }}

          />
          : <></>
      }
    </>
  )
}