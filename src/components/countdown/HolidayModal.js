import React from 'react';

const HolidayModal = ({active, onToggle, holidays}) => {
  var reformattedArray = holidays.map(obj =>{ 
    var rObj = {};
    rObj = `<tr><td>${obj.date}</td></tr>`;
    return rObj;
 });
 
  return(
    <div className={'modal' + (active ? ' is-active' : '')}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Modal title</p>
          <button className="delete" aria-label="close" onClick={onToggle}></button>
        </header>
        <section className="modal-card-body">
          <table className="table">
            <thead>
              <tr>
                <th>
                  Date
                </th>
                <th>
                  Holiday
                </th>
              </tr>
            </thead>
            <tbody>
              {reformattedArray}
            </tbody>
          </table>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success">Save changes</button>
          <button className="button">Cancel</button>
        </footer>
      </div>
    </div>
  );
}

export default HolidayModal;