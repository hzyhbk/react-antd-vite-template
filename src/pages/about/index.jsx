import React from 'react';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import Calendar from './calendar';
const { TextArea } = Input;
const oneDay = 1000 * 24 * 60 * 60;
const now = new Date().getTime();
const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <React.Fragment>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </React.Fragment>
);

export default class App extends React.Component {
  state = {
    comments: [],
    submitting: false,
    value: '',
  };

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        comments: [
          {
            author: 'Han Solo',
            avatar:
              'https://avatars2.githubusercontent.com/u/42671099?s=60&v=4',
            content: <p>{this.state.value}</p>,
            datetime: new Date().getTime(),
          },
          ...this.state.comments,
        ],
      });
    }, 1000);
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { comments, submitting, value } = this.state;

    return (
      <div>
        <Calendar
          schedules={[
            {
              id: 2838022616830084,
              body: 6047416662671072,
              title: '北才矿管声两达',
              start: now - oneDay,
              end: now,
              borderColor: '#c179f2',
              bgColor: '#79f29d',
            },
            {
              id: 7827355052328094,
              body: 5269830756979098,
              title: '格路大',
              start: now - 2 * oneDay,
              end: now - oneDay,
              borderColor: '#f27a79',
              bgColor: '#799af2',
            },
            {
              id: 220898074271064,
              body: 2218439154139238,
              title: '林例例里红叫',
              start: now - 3 * oneDay,
              end: now - 2 * oneDay,
              borderColor: '#bef279',
              bgColor: '#f279e1',
            },
          ]}
        />
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          avatar={
            <Avatar
              src="https://avatars2.githubusercontent.com/u/42671099?s=60&v=4"
              alt="Han Solo"
            />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </div>
    );
  }
}
