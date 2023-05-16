"use client";

import styles from "../styles/ProfileInfoTab.module.css";
import React, { useState } from "react";
import { Collapse, Input, Button, Form } from "antd";
const { Panel } = Collapse;
import { postUserDetails } from "../components/ApiService/userDetails";

const ProfileInfoTab = () => {
<<<<<<< HEAD
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState(['', '']);

  function handleChange() {
    // ...
  }
=======
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState(["", ""]);
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");

  function handleChange(event, setter) {
    setter(event);
  }

  const [form] = Form.useForm();
  const handleSubmit = ({ name, last, addres1, addres2, area, city1, type1 }) => {
    const user = {
      firstName: firstName,
      lastName: lastName,
      address: address.join(","),
      region: region,
      city: city,
      type: type,
    };
    console.log(user);
>>>>>>> refactor-new

    // postUserDetails(user);
    form.resetFields();
  };
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

  // const onFinish = (values) => {};

  return (
<<<<<<< HEAD
    <>
      <div className={styles.container}>
        <h2>Bussiness Details</h2>
        <Collapse accordion style={{ width: "30vw" }}>
          <Panel header="Your Details" key={1} style={{ fontWeight: "bold" }}>
            <p>Your First Name</p>
            <p>Your Last Name</p>
          </Panel>
          <Panel
            header="Your Bussiness Details"
            key={2}
            style={{ fontWeight: "bold" }}
          ></Panel>
          <Panel header="Your Locations" key={3} style={{ fontWeight: "bold" }}>
            <p>- Barcelona</p>
            <p>- London</p>
            <p>- Berlin</p>
          </Panel>
          <Panel header="Update your details" key={4}>
            <Input
              type="text"
              placeholder="First Name"
              className={styles.businessInput}
            />
            <Input
              type="text"
              placeholder="Last Name"
              className={styles.businessInput}
            />
            <h3>Business Address</h3>
            <Input
              type="text"
              placeholder="Number and Street name"
              className={styles.businessInput}
            />
            <Input
              type="text"
              placeholder="Post code"
              className={styles.businessInput}
            />
            <Input
              type="text"
              placeholder="Region"
              className={styles.businessInput}
            />
            <Input
              type="text"
              placeholder="City"
              className={styles.businessInput}
            />
            <Input
              type="text"
              onChange={handleChange}
              placeholder="Type: (Onsite / Online)"
              className={styles.businessInput}
            />
            <Button type='primary'>Submit</Button>
          </Panel>
        </Collapse>
      </div>
    </>
=======
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
          <p> {city}</p>
        </Panel>
        <Panel header="Update your details" key={4}>
          <Form onFinish={handleSubmit} form={form}>
            <Form.Item name="name">
              <Input
                type="text"
                onChange={(event: any) =>
                  handleChange(event.target.value, setFirstName)
                }
                placeholder="First Name"
                className={styles.businessInput}
              />
            </Form.Item>
            <Form.Item name="last">
              <Input
                type="text"
                onChange={(event: any) =>
                  handleChange(event.target.value, setLastName)
                }
                placeholder="Last Name"
                className={styles.businessInput}
              />
            </Form.Item>
            <h3>Business Address</h3>
            <Form.Item name="address1">
              <Input
                type="text"
                onChange={(event: any) =>
                  handleChange(event.target.value, changeAdress1)
                }
                placeholder="Number and Street name"
                className={styles.businessInput}
              />
            </Form.Item>
            <Form.Item name="address2">
              <Input
                type="text"
                onChange={(event: any) =>
                  handleChange(event.target.value, changeAdress2)
                }
                placeholder="Post code"
                className={styles.businessInput}
              />
            </Form.Item>
            <Form.Item name="area">
              <Input
                type="text"
                onChange={(event: any) =>
                  handleChange(event.target.value, setRegion)
                }
                placeholder="Region"
                className={styles.businessInput}
              />
            </Form.Item>
            <Form.Item name="city1">
              <Input
                type="text"
                onChange={(event: any) =>
                  handleChange(event.target.value, setCity)
                }
                placeholder="City"
                className={styles.businessInput}
              />
            </Form.Item>
            <Form.Item name="type1">
              <Input
                type="text"
                onChange={(event: any) =>
                  handleChange(event.target.value, setType)
                }
                placeholder="Type: (Onsite / Online)"
                className={styles.businessInput}
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              
            >
              Submit
            </Button>
          </Form>
        </Panel>
      </Collapse>
    </div>
>>>>>>> refactor-new
  );
};

export default ProfileInfoTab;
