import React from 'react';
import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { MenuRouterView, ContentRouterView, MainRouter } from './Router';
const { Header, Sider, Content } = Layout;

function Logo(props) {
  return (
    <div className="logo">
      <span style={{ color: '#61DAFB' }}>
        {props.collapsed ? 'R' : 'React'}
      </span>
      <span style={{ color: '#fbd800' }}>{props.collapsed ? 'V' : 'Vite'}</span>
      <span style={{ color: '#1890ff' }}>{props.collapsed ? 'A' : 'Antd'}</span>
    </div>
  );
}

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <MainRouter>
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <Logo collapsed={this.state.collapsed} />
            <MenuRouterView />
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              {React.createElement(
                this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: 'trigger',
                  onClick: this.toggle,
                },
              )}
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                overflow: 'auto',
              }}
            >
              <ContentRouterView />
            </Content>
          </Layout>
        </Layout>
      </MainRouter>
    );
  }
}

export default SiderDemo;
