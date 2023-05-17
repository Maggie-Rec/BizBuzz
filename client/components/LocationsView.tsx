import React, { useEffect, useState } from "react";
import { fetchLocations } from "./ApiService/database";
import randomAlphaNumeric from "../utils/randomizer";
import LocationCard from "./LocationCard";
import styles from '../styles/LocationsView.module.css';
import { Button, FloatButton, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import NewLocationForm from "./newLocationForm";

export default function LocationsView() {
  const [locations, setLocations] = useState([]);

  async function refreshLocations() {
    await fetchLocations()
      .then(data => setLocations(data as unknown as number[][]));
  };

  useEffect(() => {
    refreshLocations();
  }, []);

  return (
    <section className={styles.cardSection}>

      {locations.length > 0 && locations[0] !== undefined ?
        locations.map((item) => {
          return (
            <LocationCard
              key={randomAlphaNumeric()}
              location={item}
            />
          )
        })
        : undefined
      }

      <AddLocationModal />
    </section>
  )
};

function AddLocationModal() {
  const [newLocationModal, setNewLocationModal] = useState(false);

  function handleLocationModal() {
    setNewLocationModal(!newLocationModal);
  };

  return (
    <>
      <FloatButton onClick={handleLocationModal} icon={<PlusOutlined />} tooltip={<div>Add a new location</div>} />
      {
        newLocationModal ?
          <Modal open={newLocationModal} onCancel={handleLocationModal}
            footer={[
              <Button key={randomAlphaNumeric()} onClick={handleLocationModal}>Done</Button>
            ]}>
            <NewLocationForm />
          </Modal>
          : undefined
      }
    </>
  )
};

