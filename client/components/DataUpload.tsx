import { Button, Select, Upload } from "antd";
import React, { useRef, useState } from "react";
import { uploadData } from "./ApiService/database";
import { UploadOutlined } from "@ant-design/icons";
import styles from "../styles/DataUpload.module.css";

export default function DataUpload() {
  const [selection, setSelection] = useState("transaction");
  const [csv, setCsv] = useState<File | null>(null);

  function handleSelection(value) {
    setSelection(value);
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
      await uploadData(newUpload);
      window.alert(`Data on ${selection} uploaded`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1>Data upload</h1>
      <h3>Batch upload your data from .csv files</h3>
      <br/>
      <label htmlFor="typeSelect">I want to upload
      <Select
        id="typeSelect"
        className={styles.typeSelect}
        defaultValue="transaction"
        options={[
          { value: "transaction", label: "transactions" },
          { value: "location", label: "locations" },
          { value: "item", label: "items" },
          { value: "customer", label: "customers" }
        ]}
        onChange={(value) => handleSelection(value)}
      >
      </Select>
      data <br/>(check out the <a>format reference</a>)
      </label>
      <br/>
      <br/>
      <input id="fileUpload" type="file" onChange={handleFile} />
      <br/>
      <br/>
      <Button icon={<UploadOutlined />} onClick={handleUpload}>Upload</Button>
    </>
  )
}