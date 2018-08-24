import React, {Component} from 'react';
import moment from 'moment';

export default class Datepicker extends Component {
  state = {
    date: '',
    valid: true,
    dirty: false
  }

  handleDateChange = ({target: {value}}) => {
    const date = moment(value),
          valid = date.isValid() && date.isAfter(moment());

    this.setState({
      date: value,
      valid: valid,
      dirty: true
    })

    valid && this.props.onDateReset(date);
  }

  render() {
    let {date, valid, dirty} = this.state,
        classes = 'input is-rounded is-medium';

    valid && dirty && ( classes += ' is-success');
    !valid && dirty && ( classes += ' is-danger')

    return(
      <div className="field is-grouped is-grouped-centered" style={{marginBottom: '40px'}}>
        <p className="control has-text-centered">
          <input className={classes} value={date} onChange={this.handleDateChange} placeholder="Type a Date .." />
          
          {!valid && <i className="help is-danger is-size-6">Please type a valid and future date</i>}
        </p>
        {/* <p className="control">
          <button className="button is-light is-rounded is-medium is-outlined">
            Reset
          </button>
        </p> */}
      </div>  
    );
  }
}