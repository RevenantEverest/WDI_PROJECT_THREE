import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import ComponentOne from './components/ComponentOne';
import ComponentTwo from './components/ComponentTwo';
import ComponentThree from './components/ComponentThree';
import AllSongs from './components/AllSongs';
import OneSong from './components/OneSong';


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
              <Link to='/songs'>Link to the songs</Link>
            </nav>
              <Route exact path='/' component={ComponentOne} />
              <Route path='/componenttwo' component={ComponentTwo} />
              <Route path='/componentthree' component={ComponentThree} />
              <Route exact path='/songs' component={AllSongs} />
              <Route path='/songs/:id' component={OneSong} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
