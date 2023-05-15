import { Button, Select } from "antd";
import React, { useRef, useState } from "react";
import { uploadData } from "./ApiService/database";

export default function DataUpload() {
  const [selection, setSelection] = useState("transactions");
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
      // console.log(newUpload.get("file"));
      // console.log(newUpload.get("data"));
      await uploadData(newUpload);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1>Data upload</h1>
      <br />
      <p>Batch upload your data from .csv files</p>
      <Select
        defaultValue="transactions"
        options={[
          { value: "transaction", label: "Transactions" },
          { value: "location", label: "Locations" },
          { value: "item", label: "Items" },
          { value: "customer", label: "Customers" }
        ]}
        onChange={(value) => handleSelection(value)}
      >
      </Select>
      <br/>
      <label htmlFor="fileUpload">Please provide a .csv file with {selection} data (check out the <a>format reference</a>)
      </label>
      <br />
      <input id="fileUpload" type="file" onChange={handleFile}/>
      <br/>
      <Button onClick={handleUpload}>Upload</Button>
    </>
  )
}