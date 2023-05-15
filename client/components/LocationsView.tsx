import React, { useEffect, useState } from "react";
import Card from "antd/es/card/Card";
import { fetchLocations } from "./ApiService/database";
import randomAlphaNumeric from "../utils/randomizer";
import LocationCard from "./LocationCard";
import styles from '../styles/LocationsView.module.css';

export default function LocationsView() {
  const [locations, setLocations] = useState([]);

  async function refreshLocations() {
    await fetchLocations()
      .then(data => setLocations(data as unknown as any[]));
  };

  useEffect(() => {
    refreshLocations();
    console.log(locations);
  }, [])

  return (
    <section className={styles.cardSection}>
      {locations.map((item) => {
        return (
          <LocationCard
            key={randomAlphaNumeric()} 
            location={item}
          />
        )
      })}
    </section>
  )
}