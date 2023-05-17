import { Table } from 'antd';

export const InventoryTable = ({ data }) => {


  return (
    <Table
      dataSource={data.datasets}
    />
  )
}