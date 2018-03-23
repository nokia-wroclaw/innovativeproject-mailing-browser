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
      //console.log(this.props.params.id.bind(this));

    return(
      <div>
        <div>
        <MenuExampleSecondaryPointing/>
        </div>
        <div>
            <Grid>
                <Grid.Column width={4}>
                    <Menu fluid vertical tabular>
                        <Menu.Item  name='mail1' active={activeItem === 'mail1'} onClick={this.handleItemClick}> {this.props.params.id} </Menu.Item>
                        <Menu.Item  name='mail2' active={activeItem === 'mail2'} onClick={this.handleItemClick} > 2 </Menu.Item>
                        <Menu.Item  name='mail3' active={activeItem === 'mail3'} onClick={this.handleItemClick} > 3 </Menu.Item>
                        <Menu.Item  name='mail4' active={activeItem === 'mail4'} onClick={this.handleItemClick} > 4 </Menu.Item>
                    </Menu>
                </Grid.Column>

                <Grid.Column stretched width={12}>
                    <div>
                        {this.props.children}
                    </div>
                </Grid.Column>
            </Grid>
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
