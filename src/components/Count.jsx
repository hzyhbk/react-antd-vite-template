import React, { Component } from 'react';
import { Button } from 'antd';
class Count extends Component {
  state = {
    count: 1,
  };
  render() {
    const { className, style } = this.props;
    return (
      <div className={className} style={style}>
        Count{this.state.count}
        <Button
          type="primary"
          onClick={() => this.setState(state => state.count++)}
        >
          + plus
        </Button>
      </div>
    );
  }
}

export default Count;
