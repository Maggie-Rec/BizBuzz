import React from "react";
import { Input } from "antd";
import styles from "../../styles/widgets/bigNumber.module.css";

const BigNoMenu = () => {
  return (
    <div className={styles.container}>
      <h1>Big number Chart</h1>
      <Input type="Text" className={styles.input} />

      <Input type="Text" className={styles.input} />
    </div>
  );
};

export default BigNoMenu;
