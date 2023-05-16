"use client";

import styles from "../styles/ProfileInfoTab.module.css";
import React, { useState } from "react";
import { Collapse, Input, Button } from "antd";
const { Panel } = Collapse;
import { postUserDetails } from "../components/ApiService/userDetails";

const ProfileInfoTab = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState(["", ""]);
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");

  function handleChange(event, setter) {
    setter(event);
  }

  function handleSubmit() {
    const user = {
      firstName: firstName,
      lastName: lastName,
      address: address.join(","),
      region: region,
      city: city,
      type: type,
    };

    postUserDetails(user);
  }
  function changeAdress1(newAddress: string) {
    let temp = address;
    temp[0] = newAddress;
    setAddress([...temp]);
  }

  function changeAdress2(newAddress: string) {
    let temp = address;
    temp[1] = newAddress;
    setAddress([...temp]);
  }

  return (
    <div className={styles.container}>
      <h2>Bussiness Details</h2>
      <Collapse accordion style={{ width: "30vw" }}>
        <Panel header="Your Details" key={1} style={{ fontWeight: "bold" }}>
          <p>{firstName}</p>
          <p>{lastName}</p>
        </Panel>
        <Panel
          header="Your Bussiness Details"
          key={2}
          style={{ fontWeight: "bold" }}
        >
          <p>{address.join(",")}</p>
          <p>{region}</p>
          <p>{city}</p>
          <p>{type}</p>
        </Panel>
        <Panel header="Your Locations" key={3} style={{ fontWeight: "bold" }}>
          <p>- Barcelona</p>
          <p>- London</p>
          <p>- Berlin</p>
        </Panel>
        <Panel header="Update your details" key={4}>
          <Input
            type="text"
            onChange={(event: any) =>
              handleChange(event.target.value, setFirstName)
            }
            placeholder="First Name"
            className={styles.businessInput}
          />
          <Input
            type="text"
            onChange={(event: any) =>
              handleChange(event.target.value, setLastName)
            }
            placeholder="Last Name"
            className={styles.businessInput}
          />
          <h3>Business Address</h3>
          <Input
            type="text"
            onChange={(event: any) =>
              handleChange(event.target.value, changeAdress1)
            }
            placeholder="Number and Street name"
            className={styles.businessInput}
          />
          <Input
            type="text"
            onChange={(event: any) =>
              handleChange(event.target.value, changeAdress2)
            }
            placeholder="Post code"
            className={styles.businessInput}
          />
          <Input
            type="text"
            onChange={(event: any) =>
              handleChange(event.target.value, setRegion)
            }
            placeholder="Region"
            className={styles.businessInput}
          />
          <Input
            type="text"
            onChange={(event: any) => handleChange(event.target.value, setCity)}
            placeholder="City"
            className={styles.businessInput}
          />
          <Input
            type="text"
            onChange={(event: any) => handleChange(event.target.value, setType)}
            placeholder="Type: (Onsite / Online)"
            className={styles.businessInput}
          />
          <Button type="primary" onClick={() => handleSubmit()}>
            Submit
          </Button>
        </Panel>
      </Collapse>
    </div>
  );
};

export default ProfileInfoTab;
