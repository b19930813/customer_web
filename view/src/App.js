import React, { Component } from 'react';
import './conpoment.css';
import Main from './components/switch/search_switch'

//加入Component
class App extends Component {
  render() {
    return (
      <div className="content">
        <Main />
      </div>
    )
  }
}

export default App;