import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Property',
    dataIndex: 'property',
    key: 'property'
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value'
  }
];

const Item = props => {
  const { itemInfo } = props;

  return <Table columns={columns} dataSource={itemInfo} pagination={false} />;
};

export default Item;
