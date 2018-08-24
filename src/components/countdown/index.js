import React, {Component} from 'react';
import moment from 'moment';

import Timer from './Timer';
import Datepicker from './Datepicker'
import Control from './Control';
import HolidayModal from './HolidayModal';

export default class Countdown extends Component {
  state = {
    currentDate: moment(),
    nextDate: moment({year: moment().year() + 1}),
    paused: false,
    showHoliday : false
  };

  componentDidMount() {
    this.resume();
  }

  componentWillUnmount() {
    this.pause();
  }

  getRemainingTime() {
    let { currentDate, nextDate} = this.state,
        diff = nextDate.diff(currentDate);

    return moment.duration(diff);  
  }

  handleTogglePaused = () => { 
    this.setState(function(preState, props) {
      const paused = !preState.paused;

      if (paused) {
        this.pause();
      } else {
        this.resume()
      }

      return {
        paused
      }
    })
  }

  pause() {
    clearInterval(this.interval);
  }

  resume() {
    this.interval = setInterval(() => {
      this.setState({
        currentDate: moment()
      })
    }, 1000)
  }

  handleDateReset = (nextDate) => {
    this.setState({
      nextDate: nextDate
    })
  }

  handleHolidayToggle = () => {
    this.setState({
      showHoliday: !this.state.showHoliday
    })
  }

  render() {    
    const {paused, nextDate, showHoliday} = this.state,
          duration = this.getRemainingTime();

    return(
      <section className="hero is-dark is-bold is-fullheight has-text-centered">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              {nextDate.calendar()} is coming up !!
              <button className="button is-small is-rounded is-light" onClick={this.handleHolidayToggle} style={{margin: '5px 0 0 10px'}}>
                Holiday
              </button>
            </h1>

            <section className="section">
            <Timer duration={duration} />
            </section>

            <Datepicker onDateReset={this.handleDateReset}/>

            <Control paused={paused} onPausedToggle={this.handleTogglePaused}/>

            <HolidayModal active={showHoliday} onToggle={this.handleHolidayToggle} />
          </div>
        </div>
      </section>
    )
  }
}