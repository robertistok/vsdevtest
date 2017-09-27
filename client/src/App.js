import React, { Component } from 'react';
import styled from 'styled-components';
import { Select } from 'antd';
import { Router, Route, Link, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Menu, Icon } from 'antd';

import Home from './Home';
import ItemContainer from './ItemContainer';

const { Item: MenuItem } = Menu;

const items = [
  {
    name: 'Nexus 5',
    url: 'nexus-5'
  },
  {
    name: 'Android 4.4 KitKat',
    url: 'android-4-4-kitkat'
  },
  {
    name: 'Qualcomm Snapdragon 800 MSM8974AA v2',
    url: 'qualcomm-snapdragon-800'
  },
  {
    name: 'Qualcomm Adreno 330 (450MHz)',
    url: 'qualcomm-adreno-330'
  },
  {
    name: 'Qualcomm Krait 400',
    url: 'qualcomm-krait-400'
  }
];

const NoMatch = () => <div>nomatch</div>;

const customHistory = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      current: 'mail'
    };
  }

  handleClick(e) {
    this.setState({
      current: e.key
    });
  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  render() {
    return (
      <Wrapper>
        <Router history={customHistory}>
          <div>
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal">
              <MenuItem key="home">
                <Link to="/">Home</Link>
              </MenuItem>
              {items.map(item => (
                <MenuItem key={item.url}>
                  <Link to={`/${item.url}`}>{item.name}</Link>
                </MenuItem>
              ))}
            </Menu>

            <Switch>
              {items.map(item => (
                <Route
                  key={item.url}
                  path={`/${item.url}`}
                  render={() => <ItemContainer url={item.url} />}
                />
              ))}
              <Route path="/" component={Home} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f5fafa;
`;

export default App;
