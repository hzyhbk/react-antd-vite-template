import React, { Component } from 'react';
import { Button, Radio } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import moment from 'moment';
import TuiCalendar from 'tui-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import './calendar.less';

const DAY_NAMES = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const SCHEDULE_VIEW_TYPE = {
  month: 'time',
  week: 'task',
};

class Calendar extends Component {
  calendar = null;
  rootEl = React.createRef();
  state = {
    rangeText: '',
    viewType: 'month',
    scheduleView: 'time', // 月视图用time 周视图用task
  };
  componentDidMount() {
    const { schedules } = this.props;
    const { viewType, scheduleView } = this.state;
    this.calendar = new TuiCalendar(this.rootEl.current, {
      isReadOnly: true,
      defaultView: viewType,
      scheduleView: [scheduleView],
      taskView: [scheduleView],
      month: {
        daynames: DAY_NAMES,
        startDayOfWeek: 1,
      },
      week: {
        daynames: DAY_NAMES,
        startDayOfWeek: 1,
      },
      theme: {
        'common.holiday.color': '#333',
        'month.holidayExceptThisMonth.color': 'rgba(51, 51, 51, 0.4)',
      },
    });
    this.setRenderRangeText();
    this.setSchedules(schedules, scheduleView);
    this.bindEventHandlers(this.props);
  }
  componentDidUpdate(prevProps) {
    const { height, schedules } = this.props;

    if (height !== prevProps.height) {
      if (typeof height === 'number') {
        this.getRootElement().style.height = `${height}px`;
      } else {
        this.getRootElement().style.height = height;
      }
    }

    if (schedules !== prevProps.schedules) {
      this.calendar.clear();
      this.setSchedules(schedules, this.state.scheduleView);
    }

    this.bindEventHandlers(this.props);
  }
  getRootElement() {
    return this.rootEl.current;
  }
  setRenderRangeText = () => {
    if (!this.calendar) {
      this.setState({
        rangeText: '',
      });
    }
    const options = this.calendar.getOptions();
    const viewName = this.calendar.getViewName();
    const html = [];
    if (viewName === 'day') {
      html.push(moment(this.calendar.getDate().getTime()).format('YYYY.MM.DD'));
    } else if (
      viewName === 'month' &&
      (!options.month?.visibleWeeksCount || options.month.visibleWeeksCount > 4)
    ) {
      html.push(moment(this.calendar.getDate().getTime()).format('YYYY.MM'));
    } else {
      html.push(
        moment(this.calendar.getDateRangeStart().getTime()).format(
          'YYYY.MM.DD',
        ),
      );
      html.push(' ~ ');
      html.push(
        moment(this.calendar.getDateRangeEnd().getTime()).format(' MM.DD'),
      );
    }
    this.setState({
      rangeText: html.join(''),
    });
  };
  setSchedules(schedules, scheduleView) {
    if (schedules && schedules.length) {
      this.calendar.createSchedules(
        schedules.map(item => ({ ...item, category: scheduleView })),
      );
    }
  }
  bindEventHandlers = props => {
    const eventHandlerNames = Object.keys(props).filter(key =>
      /on[A-Z][a-zA-Z]+/.test(key),
    );

    eventHandlerNames.forEach(key => {
      const eventName = key[2].toLowerCase() + key.slice(3);
      this.calendar.off(eventName);
      this.calendar.on(eventName, props[key]);
    });
  };
  handleClick = (type, val) => {
    switch (type) {
      case 'move-prev':
        this.calendar.prev();
        break;
      case 'move-next':
        this.calendar.next();
        break;
      case 'move-today':
        this.calendar.today();
        break;
      case 'change-view-type':
        this.setState({
          viewType: val,
        });
        this.calendar.changeView(val);
        this.calendar.setOptions({
          scheduleView: [SCHEDULE_VIEW_TYPE[val]],
          taskView: [SCHEDULE_VIEW_TYPE[val]],
        });
        this.calendar.clear();
        this.setSchedules(this.props.schedules, SCHEDULE_VIEW_TYPE[val]);
        break;
      default:
        return;
    }
    this.setRenderRangeText();
  };
  render() {
    const { className, style, height } = this.props;
    const { rangeText, viewType } = this.state;
    return (
      <div className={className} style={style}>
        <div className="menu">
          <Button.Group>
            <Button
              icon={<LeftOutlined />}
              onClick={() => {
                this.handleClick('move-prev');
              }}
            />
            <Button
              icon={<RightOutlined />}
              onClick={() => {
                this.handleClick('move-next');
              }}
            />
          </Button.Group>

          <Button
            className="today-btn"
            onClick={() => {
              this.handleClick('move-today');
            }}
          >
            今天
          </Button>
          <h1 className="render-range">{rangeText}</h1>
          <Radio.Group
            className="view-type"
            onChange={e => {
              this.handleClick('change-view-type', e.target.value);
            }}
            value={viewType}
          >
            <Radio.Button value="month">月</Radio.Button>
            <Radio.Button value="week">周</Radio.Button>
          </Radio.Group>
        </div>

        <div ref={this.rootEl} style={{ height }} />
      </div>
    );
  }
}

export default Calendar;
