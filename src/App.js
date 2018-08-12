import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor(props){
        super(props);

        this.restHost = 'http://localhost:8080/rest';
        this.customersList = [];
    }

    componentDidMount() {
        fetch(this.restHost + '/customer/findAll')
            .then(response => response.json())
            .then(data => {
                    for(let cust of data) {
                        this.customersList.push(cust);
                        console.log(cust);}
                    }
                );
    }

    render() {
        return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to HELL</h1>
            </header>
            <p className="App-intro">
            </p>
          </div>
        );
    }
}

export default App;
