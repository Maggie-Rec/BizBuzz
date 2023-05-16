import { Button, Form, Input, Select } from "antd";
import React, { useState } from "react";
import { Location } from "../utils/types";
import { addLocation } from "./ApiService/database";

export default function NewLocationForm() {
  const [name, setName] = useState("");
  const [full_address, setFull_address] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");

  async function handleSubmit() {
    try {
      const newLocation: Location = {
        // id: 0,
        name: name,
        full_address: full_address,
        region: region,
        city: city,
        type: type
      };
      // console.log(newLocation);
      // for (let value of Object.values(newLocation)) {
      //   console.log(value);
      //   if (value === "") window.alert("Please provide all the details for a location");
      //   throw new Error;
      // };
      console.log("here");
      const response = await addLocation(newLocation);
      if (response.status === 201) window.alert("Posted location details to the database");
    } catch (error) {
      console.error(error);
      window.alert("Failed to post location details to the database");
    }
  };

  function handleChange(value, setter) {
    setter(value);
  };

  return (
    <>
      <Form>
        <h2>New location info</h2>
        <br />

        <Form.Item name="name">
          <Input
            type="text"
            onChange={(event: any) =>
              handleChange(event.target.value, setName)
            }
            placeholder="Name"
          />
        </Form.Item>

        <Form.Item name="address">
          <Input
            type="text"
            onChange={(event: any) =>
              handleChange(event.target.value, setFull_address)
            }
            placeholder="Number and Street name"
          />
        </Form.Item>

        <Form.Item name="area">
          <Input
            type="text"
            onChange={(event: any) =>
              handleChange(event.target.value, setRegion)
            }
            placeholder="Region"
          />
        </Form.Item>

        <Form.Item name="city">
          <Input
            type="text"
            onChange={(event: any) =>
              handleChange(event.target.value, setCity)
            }
            placeholder="City"
          />
        </Form.Item>

        <Form.Item name="type">
          <Select
            id="typeSelect"
            defaultValue="location"
            options={[
              { value: "outlet", label: "Outlet" },
              { value: "online", label: "Online" }
            ]}
            onChange={(value) => handleChange(value, setType)}
          />
        </Form.Item>

      </Form>
      <Button onClick={handleSubmit} type="primary">Submit</Button>
    </>
  )
}
