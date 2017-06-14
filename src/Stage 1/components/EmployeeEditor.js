import React, { Component } from 'react';

class EmployeeEditor extends Component {
  constructor() {
    super();
    this.state = {
      employee: null,
      originalEmployee: null,
      notModified: true
    };

   // here we bind our functions so that the "this"s used therein are in the context
    // to EmployeeEditor
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  // componentWillReceiveProps - 
  // ie componenent receiving props: this fn tells component what to do with props
  componentWillReceiveProps(props) {
    this.setState({ employee: Object.assign({}, props.selected), originalEmployee: props.selected });
  }

  // handleChange - handles the change of employee values and stores them as a 
  // "temp" value on state called "employee"
  handleChange(prop, val) {
    if ( this.state.notModified ) {
      this.setState({ notModified: false });
    }

    //in order to update and item on state we need to pass in a completely different item
    let employeeCopy = Object.assign({}, this.state.employee) //copy
    employeeCopy[prop] = val; // change the one item we want to change
    this.setState({ employee: employeeCopy}) // store newCopy on temp state property
  }

  save() {
    // call the update methods on originalEmployee (as the original it still retains 
    // all methods attached to it) - these methods in turn update that empoyee's values
    this.state.originalEmployee.updateName(this.state.employee.name);
    this.state.originalEmployee.updatePhone(this.state.employee.phone);
    this.state.originalEmployee.updateTitle(this.state.employee.title);
    
    // set as not modified
    this.setState({ notModified: true });
    this.props.refreshList(); // tells list to reupdate with the new info
  }

  cancel() {
    //reverting changes by saving a copy of original to temp "employee" property
    var employeeCopy = Object.assign({}, this.state.originalEmployee);
    this.setState({ employee: employeeCopy, notModified: true });
  }
  
  render() {
    return (
      <div className="infoCard">
        { 
          this.state.employee
          ? 
          <div>
            <span id="employeeID"> ID: { this.state.employee.id } </span>
            <p id="employeeTitle"> { this.state.originalEmployee.name } </p>
            <br />
            <button id="saveBtn" className="confirmationButton" disabled={this.state.notModified} onClick={ this.save }> Save </button>
            <button className="neutralButton" disabled={this.state.notModified} onClick={ this.cancel }> Cancel </button>
            <br />
            <span className="placeholderText"> Name </span>
            <input className="materialInput" value={ this.state.employee.name } onChange={ (e) => { this.handleChange('name', e.target.value) } }></input>
            <span className="placeholderText"> Phone Number </span>
            <input className="materialInput" value={ this.state.employee.phone } onChange={ (e) => { this.handleChange('phone', e.target.value) } }></input>
            <span className="placeholderText"> Title </span>
            <input className="materialInput" value={ this.state.employee.title } onChange={ (e) => { this.handleChange('title', e.target.value) } }></input>
          </div>
          :
          <p id="noEmployee"> No Employee Selected </p>
        }
       
      </div>
    )
  }
}

export default EmployeeEditor;