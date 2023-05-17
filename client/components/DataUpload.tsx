import { Button, Popover, Select, Upload, message } from "antd";
import React, { useRef, useState } from "react";
import { uploadData } from "./ApiService/database";
import { UploadOutlined } from "@ant-design/icons";
import styles from "../styles/DataUpload.module.css";

export default function DataUpload() {
  const [selection, setSelection] = useState("location");
  const [csv, setCsv] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("name, full_address, region, city, type");
  const [messageApi, contextHolder] = message.useMessage();

  function handleSelection(value) {
    setSelection(value);
    setPrompt(formatPrompt[value]);
  };

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const fileInput = event.target.files as FileList;
    setCsv(fileInput[0]);
  };

  async function handleUpload() {
    const newUpload = new FormData();
    newUpload.set("data", JSON.stringify({
      target: selection
    }));
    newUpload.set("file", csv);
    try {
      const response = await uploadData(newUpload);
      if (response.status === 201) {
        message.success(`Data on ${selection}s uploaded`);
        setCsv(null);
      } else {
        message.error(`Failed to upload ${selection} data`);
      };
    } catch (error) {
      message.error("Hey");
      console.error(error);
    }
  };

  const formatPrompt = {
    location: "name, full_address, region, city, type",
    item: "SKU, unit_of_measurement, description, category, price_no_tax",
    customer: "name, age, email, gender",
    transaction: "transaction_id, date, time, location_id, SKU, quantity, is_member, customer_id, total_with_tax, tax"
  };

  return (
    <>
      <h1>Data upload</h1>
      <h3>Batch upload your data from .csv files</h3>
      <br />
      <label htmlFor="typeSelect">
        I want to upload
        <Select
          id="typeSelect"
          className={styles.typeSelect}
          defaultValue="location"
          options={[
            { value: "location", label: "locations" },
            { value: "item", label: "items" },
            { value: "customer", label: "customers" },
            { value: "transaction", label: "transactions" },
          ]}
          onChange={(value) => handleSelection(value)}
        ></Select>
        data <br />
        (check out the{" "}
        <Popover content={<p>{prompt}</p>}>
          <a className={styles.clickableText}> format reference</a>
        </Popover>
        )
      </label>
      <br />
      <br />
      <div className={styles.fileUpload}>
        <input
          id="fileUpload"
          type="file"
          onChange={handleFile}
          className={styles.fileUpload__input}
        />
      </div>
      <Button icon={<UploadOutlined />} onClick={() => handleFile} type="primary">
        Upload
      </Button>
      <br />
      <br />
      <Button icon={<UploadOutlined />} onClick={handleUpload} type="primary">
        Upload
      </Button>
    </>
  );
}