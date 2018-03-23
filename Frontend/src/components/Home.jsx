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
            mails: [],
            activeItem: 'mail1',
            text: 'fsfdsfsdsdf'
        };
    }

    handleItemClick = (e, { name}) => this.setState({ activeItem: name});

    componentDidMount(){
        axios.get("db.json")
            .then( (response) => {
                console.log(response);
                this.setState({
                    mails: response.data.mail,
                    total: response.data.mail.length
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

  render() {
      const { activeItem } = this.state;

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

search(query = "star"){
  // var url="http://localhost:3000/users/2";
  // Request.get(url).then((response)=>{
  //   console.log(response);

  // });
  axios.get("db.json")
  .then( (response) => {
    console.log(response);
    this.setState({
      mails: response.data.mail,
      total: response.data.mail.length
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

}



export default Home;
