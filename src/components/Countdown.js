import React, {Component} from 'react';
import moment from 'moment';
import Control from './Control'

export default class Countdown extends Component{
  constructor(props) {
    super(props)

    this.state = {
      duration: this.getRemainingTime(),
      paused: false
    }

    // this.handleTogglePaused = this.handleTogglePaused.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        duration:this.getRemainingTime()
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
        clearInterval(this.interval);
      } else {
        this.interval = setInterval(() => {
          this.setState({
            duration:this.getRemainingTime()
          })
        }, 1000)
      }

      return {
        paused
      }
    })
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
              <nav className="level">
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Days</p>
                    <p className="title">{Math.floor(duration.asDays()).toString().padStart(3, '0')}</p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Hours</p>
                    <p className="title">{duration.hours().toString().padStart(2, '0')}</p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Minutes</p>
                    <p className="title">{duration.minutes().toString().padStart(2, '0')}</p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Seconds</p>
                    <p className="title">{duration.seconds().toString().padStart(2, '0')}</p>
                  </div>
                </div>
              </nav>
            </section>

            <Control paused={paused} onPausedToggle={this.handleTogglePaused}/>
          </div>
        </div>
      </section>

    );
  }
}
