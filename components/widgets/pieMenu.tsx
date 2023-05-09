import React from "react";
import { Input } from "antd";
import styles from "../../styles/widgets/areaMenu.module.css";

const PieMenu = () => {
  return (
    <div className={styles.container}>
      <Input type="Text" className={styles.input} />

      <Input type="Text" className={styles.input} />
    </div>
  );
};

export default PieMenu;
