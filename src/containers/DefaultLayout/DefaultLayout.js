import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import Login from "../../views/Pages/Login";

class DefaultLayout extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-body">
          <main className="main">
            <Container fluid>
              <Switch>
                  <Route exact path="/" name='Login' component={Login} />
              </Switch>
            </Container>
          </main>

        </div>

      </div>
    );
  }
}
export default DefaultLayout;
