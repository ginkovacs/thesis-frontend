import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import Appmine from "../../views/Base/Appmine";

class DefaultLayout extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-body">
          <main className="main">
            <Container fluid>
              <Switch>
                  <Route exact path="/" name='Base' component={Appmine} />
                  <Route path="/App" name='Base' component={Appmine} />
              </Switch>
            </Container>
          </main>

        </div>

      </div>
    );
  }
}
export default DefaultLayout;
