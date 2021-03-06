import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import { Menu } from 'antd';
import {
  HomeOutlined,
  GithubOutlined,
  CalendarOutlined,
  TableOutlined,
  PaperClipOutlined,
} from '@ant-design/icons';
import Home from './pages/index';
import Main from './pages/main';
import About from './pages/about';
import Table from './pages/table';
import Dnd from './pages/dnd';

export function MenuRouterView() {
  const location = useLocation();
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
      <Menu.Item key="/" icon={<HomeOutlined />}>
        <Link to="/">首页</Link>
      </Menu.Item>
      <Menu.Item key="/about" icon={<CalendarOutlined />}>
        <Link to="/about">日历</Link>
      </Menu.Item>
      <Menu.Item key="/table" icon={<TableOutlined />}>
        <Link to="/table">表格</Link>
      </Menu.Item>
      <Menu.Item key="/dnd" icon={<PaperClipOutlined />}>
        <Link to="/dnd">拖动</Link>
      </Menu.Item>
      <Menu.Item key="/main" icon={<GithubOutlined />}>
        <Link to="/main">关于</Link>
      </Menu.Item>
    </Menu>
  );
}
export function ContentRouterView() {
  return (
    <Switch>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/main">
        <Main />
      </Route>
      <Route path="/table">
        <Table />
      </Route>
      <Route path="/dnd">
        <Dnd />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
}
export function MainRouter(props) {
  return <Router>{props.children}</Router>;
}
