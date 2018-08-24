import React, {Component} from 'react';
import moment from 'moment';

import Timer from './Timer';
import Datepicker from './Datepicker'
import Control from './Control';

export default class Countdown extends Component {
  state = {
    duration: this.getRemainingTime(),
    paused: false
  };

  componentDidMount() {
    this.resume();
  }

  componentWillUnmount() {
    this.pause();
  }

  getRemainingTime() {
    let now = moment(),
      newYear = moment({
        year: now.year() + 1,

      }); 
    let diff = newYear.diff(now);   // return in milliseconds

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
        duration:this.getRemainingTime()
      })
    }, 1000)
  }


  render() {    
    const {duration, paused} = this.state;

    return(
      <section className="hero is-dark is-bold is-fullheight has-text-centered">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              New year is coming up !!
            </h1>

            <section className="section">
            <Timer duration={duration} />
            </section>

            <Datepicker />

            <Control paused={paused} onPausedToggle={this.handleTogglePaused}/>
          </div>
        </div>
      </section>
    )
  }
}