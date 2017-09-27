import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'antd';

import Item from './Item';

const apiURL = 'http://localhost:3010/vsdev/api';

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

function constructItemInfo(itemProperties) {
  const itemInfo = Object.keys(itemProperties).reduce((acc, itemKey, index) => {
    if (itemProperties[itemKey] instanceof Object) {
      console.log(itemKey);
      return [
        ...acc,
        {
          key: index,
          property: itemKey,
          value: (
            <Item
              itemInfo={constructItemInfo(itemProperties[itemKey].properties)}
            />
          )
        }
      ];
    } else {
      return [
        ...acc,
        {
          key: index,
          property: itemKey,
          value: itemProperties[itemKey].toString()
        }
      ];
    }
  }, []);

  return itemInfo;
}

class ItemContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { itemInfo: undefined };
  }

  componentDidMount() {
    const newItem = this.props.url;

    axios({
      method: 'get',
      url: `${apiURL}/${newItem}`
    }).then(({ data }) => this.setState({ loading: false, itemInfo: data }));
  }

  render() {
    const { itemInfo } = this.state;

    if (itemInfo === undefined) {
      return <span>No item</span>;
    }

    return <Item itemInfo={constructItemInfo(itemInfo.properties)} />;
  }
}

export default ItemContainer;
