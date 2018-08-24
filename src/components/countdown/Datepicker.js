import React, {Component} from 'react';

export default class Datepicker extends Component {
  state = {
    date: ''
  }

  handleDateChange = (e) => {
    this.setState({
      date: e.target.value
    })
  }

  handleDateSubmit = (e) => {
    e.preventDefault();
    
    console.log(this.state.date);
  }

  render() {
    const {date} = this.state.date;

    return(
      <form onSubmit={this.handleDateSubmit}>
        <div className="field is-grouped is-grouped-centered" style={{marginBottom: '40px'}}>
          <p className="control">
            <input className="input is-rounded is-medium" value={date} onChange={this.handleDateChange} placeholder="Type a Date .." />
          </p>
          <p className="control">
            <button className="button is-light is-rounded is-medium is-outlined">
              Reset
            </button>
          </p>
        </div>
      </form>    
    );
  }
}