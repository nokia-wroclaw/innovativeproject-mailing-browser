import React, { Component } from 'react';
import '../App.css';
import MenuExampleSecondaryPointing from './MenuPointing';
import { request } from 'http';
import { Grid, Menu, Segment } from 'semantic-ui-react'
import axios from 'axios';

export class Home extends Component {

    constructor(){
        super();
        this.state = {
        };
    }


  render() {

    return(
      <div>
        <div>
        <MenuExampleSecondaryPointing/>
        </div>
        <div>
                        {this.props.children}
        </div>
    </div>

      );
    }

}



export default Home;
