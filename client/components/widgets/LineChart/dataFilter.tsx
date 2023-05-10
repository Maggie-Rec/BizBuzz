import { Space, Select } from 'antd';

export const DataFilter = ({ isLast }: { isLast: boolean }) => {


  return (
    <>
      <Space />
      <p>{isLast ? "Filter by:" : "Filtering by"}</p>
      <Select
        defaultValue="location"
        style={{ width: 120 }}
        // onChange={handleChange}
        // className={styles.input}
        options={[
          { value: "location", label: "Location" },
          { value: "quantity", label: "Item Quantity" },
          { value: "member", label: "Membership" },
          { value: "tax", label: "Tax" },
          { value: "age", label: "Age" },
          { value: "gender", label: "Gender" },
          { value: "units", label: "Units" },
          { value: "category", label: "Item Category" },
          { value: "region", label: "Location Region" },
        ]}
      />

    </>
  )
}