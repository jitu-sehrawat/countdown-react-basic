import React, {Component} from 'react';
import moment from 'moment';

import Timer from './Timer';
import Datepicker from './Datepicker'
import Control from './Control';

export default class Countdown extends Component {
  state = {
    currentDate: moment(),
    nextDate: moment({year: moment().year() + 1}),
    paused: false
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

  render() {    
    const {paused, nextDate} = this.state,
          duration = this.getRemainingTime();

    return(
      <section className="hero is-dark is-bold is-fullheight has-text-centered">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              {nextDate.calendar()} is coming up !!
            </h1>

            <section className="section">
            <Timer duration={duration} />
            </section>

            <Datepicker onDateReset={this.handleDateReset}/>

            <Control paused={paused} onPausedToggle={this.handleTogglePaused}/>
          </div>
        </div>
      </section>
    )
  }
}