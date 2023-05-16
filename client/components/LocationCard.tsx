import React, { useEffect, useState } from "react";
import { Avatar, Card } from "antd";
import styles from '../styles/LocationCard.module.css';
import { getCoordinates, getMapImage } from "./ApiService/getLocationPicBing";
import { UrlObject } from "url";
import Image from "next/image";
import Meta from "antd/es/card/Meta";
import getManager from "../utils/managers";
import { getRandomPerson } from "./ApiService/getUserPic";

interface Location {
  id: number,
  name: string,
  full_address: string,
  region: string,
  type: string
};

interface Manager {
  picture: {
    large: string
  },
  name: {
    first: string,
    last: string
  }
};

export default function LocationCard({ location }) {
  const [image, setImage] = useState("");
  // const [managerPic, setManagerPic] = useState("");
  const [manager, setManager] = useState({
    picture: {
      large: ""
    },
    name: {
      first: "Chicken",
      last: "General"
    }
  } as Manager);


  async function getImage() {
    const coords = await getCoordinates(location.full_address);
    const imageBlobUrl = await getMapImage(coords);
    setImage(imageBlobUrl);
  };

  // async function getManagerPic() {
  //   const url = await getUserPic();
  //   setManagerPic(url);
  // };

  async function getManager() {
    const person = await getRandomPerson();
    console.log(person);
    setManager(person.results[0]);
  }

  useEffect(() => {
    getImage();
    // getManagerPic();
    getManager();
  }, []);

  return (
    <Card className={styles.card}
      cover={<img alt="store map" src={image} />}
    >
      <Meta className={styles.info}
        avatar={<Avatar src={manager.picture.large} size={96} />}
        title={<h4 className={styles.title}>{location.name}</h4>}
        description={`Manager: ${manager.name.first} ${manager.name.last}`}
      />
    </Card>
  )
}