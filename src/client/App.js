import React, { Component } from 'react';
import './app.css';
import BootstrapTable from 'react-bootstrap-table-next';


export default class App extends Component {
  state = { locations: null };

  componentDidMount() {
    fetch('/api/rooms?checkin_date=2018-10-28&checkout_date=2018-10-30&location=BOS')
      .then(res => res.json())
      .then(locationList => this.setState({ locations: locationList }));
  }
  

  getValues(locations){
    
    const listItems = locations.map((currentObject, index) =>
      <li key={index}>{currentObject.name} - {currentObject.phone} - {currentObject.address.line1} </li>
    );
    return listItems;
  }
  
  render() {
    const { locations } = this.state;
    
    const columns = [{
      dataField: 'name',
      text: 'Name'
    }, {
      dataField: 'price',
      text: 'Total Price'
    }, {
      dataField: 'address',
      text: 'Address'
    }, {
      dataField: 'phone',
      text: 'Phone'
    }];

    return (
      <div >

        {locations ? <BootstrapTable keyField='id' striped hover condensed data={ locations } columns={ columns } /> : <h1>Loading.. please wait!</h1>}
        
      </div>
    );
  }


}
