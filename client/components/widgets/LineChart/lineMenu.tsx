import React from "react";
import { Select, Space, Button } from "antd";
import styles from "../../../styles/widgets/lineChart.module.css";

interface Props {
  showWidget: (arg0: string) => void;
}
const LineMenu = ({showWidget}: Props) => {
   const openWidget = () => {
     showWidget("Line Chart");
   };
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className={styles.container}>
      <h1>Area Chart</h1>
      <Space wrap>
        <Select
          defaultValue="location"
          style={{ width: 120 }}
          onChange={handleChange}
          className={styles.input}
          options={[
            { value: "location", label: "Location" },
            { value: "quantity", label: "Item Quantity" },
            { value: "memebr", label: "Membership" },
            { value: "tax", label: "Tax" },
            { value: "age", label: "Age" },
            { value: "gender", label: "Gender" },
            { value: "units", label: "Units" },
            { value: "category", label: "Item Category" },
            { value: "region", label: "Location Region" },
          ]}
        />
        <Select
          defaultValue="location"
          style={{ width: 120 }}
          onChange={handleChange}
          className={styles.input}
          options={[
            { value: "location", label: "Location" },
            { value: "quantity", label: "Item Quantity" },
            { value: "memebr", label: "Membership" },
            { value: "tax", label: "Tax" },
            { value: "age", label: "Age" },
            { value: "gender", label: "Gender" },
            { value: "units", label: "Units" },
            { value: "category", label: "Item Category" },
            { value: "region", label: "Location Region" },
          ]}
        />

        <Select
          defaultValue="location"
          style={{ width: 120 }}
          onChange={handleChange}
          className={styles.input}
          options={[
            { value: "location", label: "Location" },
            { value: "quantity", label: "Item Quantity" },
            { value: "memebr", label: "Membership" },
            { value: "tax", label: "Tax" },
            { value: "age", label: "Age" },
            { value: "gender", label: "Gender" },
            { value: "units", label: "Units" },
            { value: "category", label: "Item Category" },
            { value: "region", label: "Location Region" },
          ]}
        />
        <Select
          defaultValue="location"
          style={{ width: 120 }}
          onChange={handleChange}
          className={styles.input}
          options={[
            { value: "location", label: "Location" },
            { value: "quantity", label: "Item Quantity" },
            { value: "memebr", label: "Membership" },
            { value: "tax", label: "Tax" },
            { value: "age", label: "Age" },
            { value: "gender", label: "Gender" },
            { value: "units", label: "Units" },
            { value: "category", label: "Item Category" },
            { value: "region", label: "Location Region" },
          ]}
        />
        <Select
          defaultValue="location"
          style={{ width: 120 }}
          onChange={handleChange}
          className={styles.input}
          options={[
            { value: "location", label: "Location" },
            { value: "quantity", label: "Item Quantity" },
            { value: "memebr", label: "Membership" },
            { value: "tax", label: "Tax" },
            { value: "age", label: "Age" },
            { value: "gender", label: "Gender" },
            { value: "units", label: "Units" },
            { value: "category", label: "Item Category" },
            { value: "region", label: "Location Region" },
          ]}
        />
        <Select
          defaultValue="location"
          style={{ width: 120 }}
          onChange={handleChange}
          className={styles.input}
          options={[
            { value: "location", label: "Location" },
            { value: "quantity", label: "Item Quantity" },
            { value: "memebr", label: "Membership" },
            { value: "tax", label: "Tax" },
            { value: "age", label: "Age" },
            { value: "gender", label: "Gender" },
            { value: "units", label: "Units" },
            { value: "category", label: "Item Category" },
            { value: "region", label: "Location Region" },
          ]}
        />
      </Space>
      <Button onClick={openWidget}>Display</Button>
    </div>
  );
};

export default LineMenu;
