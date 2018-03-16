import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import ComponentOne from './components/ComponentOne';
import ComponentTwo from './components/ComponentTwo';
import ComponentThree from './components/ComponentThree';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <nav>
              <Link to='/'>Home Link</Link>
              <Link to='/componenttwo'>Link to the Second Page</Link>
              <Link to='/componentthree'>Link to the Third Page</Link>
            </nav>
              <Route exact path='/' component={ComponentOne} />
              <Route path='/componenttwo' component={ComponentTwo} />
              <Route path='/componentthree' component={ComponentThree} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
