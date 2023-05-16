import React, { useEffect, useState } from "react";
import { Avatar, Card } from "antd";
import styles from '../styles/LocationsView.module.css';
import { getCoordinates, getMapImage } from "./ApiService/getLocationPicBing";
import { UrlObject } from "url";
import Image from "next/image";
import Meta from "antd/es/card/Meta";
import getManager from "../utils/managers";

interface Location {
  id: number,
  name: string,
  full_address: string,
  region: string,
  type: string
};


export default function LocationCard({ location }) {
  const [image, setImage] = useState("");

  async function getImage() {
    const coords = await getCoordinates(location.full_address);
    const imageBlobUrl = await getMapImage(coords);
    setImage(imageBlobUrl);
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <Card className={styles.card}
      cover={<img alt="store map" src={image} />}
    >
      <Meta
        avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=male" size={96} />}
        title={location.name}
        description={`Manager: ${getManager()}`}
      />
    </Card>
  )
}