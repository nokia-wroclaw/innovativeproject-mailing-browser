import React, { Component } from 'react';
import './App.css';
import SideMenu from './Menu';
import MenuExampleSecondaryPointing from './MenuPointing';


class App extends Component {
  render() {
    return (
      <div>
        <div>
        <MenuExampleSecondaryPointing/>
        </div>
        <div>
        <SideMenu/>
        </div>
    </div>
    );

    }
}



export default App;
