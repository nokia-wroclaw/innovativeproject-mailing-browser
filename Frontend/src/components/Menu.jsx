import React, { Component } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import axios from 'axios';
import _ from 'lodash';

export default class MenuExampleTabularOnLeft extends Component {

    constructor(){
        super();
        this.state = {
            mails: [],
            activeItem: 'bio',
            text: 'fsfdsfsdsdf',
            number: 0
        };
    }

    // componentWillUpdate(){
    //     this.Clicked();
    // }

    handleItemClick = (e, { name , number }) => this.setState({ activeItem: name, number: number});
   // handleItemClick = (e, { number }) => this.setState({ activeItem: name, number: number })

    Click(){
        axios.get("db.json")
            .then( (response) => {
                console.log("sasafasf");
                console.log(response.data.mail);
                this.setState({
                    mails: response.data.mail,
                    total: response.data.mail.length,
                    text: "noniezle"
                });
            })
            .catch(function (error) {
                console.log(error);
            });
}



   // clicked = this.getOne(1).then((result)=>{console.log(result)});
   // clicked = (e, { this.getOne(1) }) => this.setState({ text: this.getOne(1) })
Clicked(){
       // const tmp = this.getOne(this.state.number);
      this.setState({text: "fgfd"});
}

    getOne(index) => {
    return axios.get("db.json")
.then( response => response.data[index]);
}

//
//     Click4(){
//         this.setState({
//             number: 3
//         });
//     }
    render() {
        // console.log('fsfds');
        // console.log(this.state);
        const { activeItem } = this.state;
        //const { text } = this.state;

        return (
            <Grid>
                <Grid.Column width={4}>
                    <Menu fluid vertical tabular>
                        <Menu.Item number = {0} name='bio' active={activeItem === 'bio'} onClick={this.handleItemClick} />
                        <Menu.Item number = {1} name='pics' active={activeItem === 'pics'} onClick={this.handleItemClick} />
                        <Menu.Item number = {2} name='companies' active={activeItem === 'companies'} onClick={this.handleItemClick} />
                        <Menu.Item number = {3} name='links' active={activeItem === 'links'} onClick={this.handleItemClick} />
                    </Menu>
                </Grid.Column>

                <Grid.Column stretched width={12}>
                    <Segment>
                        {this.state.number}
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}