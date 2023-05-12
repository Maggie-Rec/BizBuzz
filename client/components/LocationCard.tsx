import React from "react";
import { Card } from "antd";
import styles from '../styles/LocationsView.module.css';

interface Location {
  id: number,
  name: string,
  full_address: string,
  region: string,
  type: string
};

export default function LocationCard({ location }) {

  return (
    <Card className={styles.card} 
          title={location.name}>
      <p>{location.full_address}</p>
      <p>{location.type}</p>
    </Card>
  )
}