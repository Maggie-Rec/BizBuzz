import React, { ChangeEvent, Dispatch, SetStateAction, useState , useEffect} from "react";
import { Space, Select, Button, Modal } from "antd";
import styles from "../../../styles/widgets/pieMenu.module.css";
import { useDispatch } from "react-redux";
import PieChart from "./pieChart";


const PieMenu = ({ func }) => {
  const [period, setPeriod] = useState("");
  const [dataType, setDataType] = useState('["transaction", { "location_id": "value" }]');
  const [isShowing, setIsShowing] = useState(true);

  const dispatch = useDispatch();

  function handleChange(value: string, setter: (selection: string) => void) {
    setter(value);
  }

  function addWidget() {
    function newPieChart() {
      return <PieChart
        type={"PieChart"}
        pieChartSelection={[period, dataType]}
        id={Date.now()}
        key={Date.now()}
      />;
    }
    dispatch({
      type: "ADD_WIDGET",
      payload: newPieChart(),
    });
    handleCancel();
  };
  useEffect(() => {
    setIsShowing(true);
  }, []);
  function handleCancel() {
    setIsShowing(!isShowing);
    func();
  }

  return (
    <Modal
      open={isShowing}
      onOk={addWidget}
      onCancel={() => handleCancel()}
      cancelButtonProps={{ style: { display: "none" } }}
    //  okButtonProps={{ style: { display: "none" }}}
    >
      <div className={styles.container}>
        <h1>Sales</h1>
        <Space wrap>
          <label>
            Period to show
            <br />
            <Select
              defaultValue="past_week"
              style={{ width: 120 }}
              onChange={(event) => handleChange(event, setPeriod)}
              className={styles.input}
              options={[
                { value: "past_week", label: "Past week" },
                { value: "past_month", label: "Past month" },
                { value: "past_quarter", label: "Past quarter" },
              ]}
            />
          </label>

          <label>
            Present by
            <br />
            <Select
              defaultValue="location"
              style={{ width: 120 }}
              onChange={(event) => handleChange(event, setDataType)}
              className={styles.input}
              options={[
                // QUERY STRINGS TO PUT IN 'WHERE' OF THE PRISMA QUERY
                // value TO BE SUBSTITUTED FOR ACTUAL VALUES
                {
                  value: '["transaction", { "location_id": "value" }]',
                  label: "Locations",
                },
                {
                  value: '["location", { "region": "value" }]',
                  label: "Regions",
                },
                {
                  value: '["item", { "category": "value" }]',
                  label: "Item category",
                },
                {
                  value: '["transaction", { "is_member": "value" }]',
                  label: "Client status",
                },
                {
                  value: '["customer", { "gender": "value" }]',
                  label: "Client gender",
                },
              ]}
            />
          </label>
        </Space>
        <br />
        <br />
  
      </div>
    </Modal>
  );
};

export default PieMenu;
