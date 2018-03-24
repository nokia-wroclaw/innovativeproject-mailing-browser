import React, { Component } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import axios from 'axios';
import Mail from './Mail.jsx';
import MailList from './MailList';
//import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {render} from 'react-dom';

import Home from './Home';
import {Root} from './Root';
import {BrowserRouter as Router,Route, Switch } from 'react-router-dom';


export default class MenuExample extends Component {

    constructor(){
        super();
        this.state = {
            mails: [],
            activeItem: 'mail1',
            text: 'fsfdsfsdsdf'
        };
    }

    // componentWillUpdate(){
    //     this.Clicked();
    // }

    handleItemClick = (e, { name}) => this.setState({ activeItem: name});
   // handleItemClick = (e, { number }) => this.setState({ activeItem: name, number: number })

    Click(){
        axios.get("/db.json")
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

    getOne = (index) => {
    return axios.get("db.json")
.then( response => response.data[index]);
}

//getOne(1).then((result) => {
//    console.log(result);
//})
//     Click4(){
//         this.setState({
//             number: 3
//         });
//     }
    render() {
        // console.log('fsfds');
        // console.log(this.state);
        const { activeItem } = this.state;
        const { number } = this.state;
        return (
            <Grid>
                <Grid.Column width={4}>
                    <Menu fluid vertical tabular>
                        <Menu.Item  name='mail1' active={activeItem === 'mail1'} onClick={this.handleItemClick}>blabl</Menu.Item>
                        <Menu.Item  name='mail2' active={activeItem === 'mail2'} onClick={this.handleItemClick} > fg</Menu.Item>
                        <Menu.Item  name='mail3' active={activeItem === 'mail3'} onClick={this.handleItemClick} > gf</Menu.Item>
                        <Menu.Item  name='mail4' active={activeItem === 'mail4'} onClick={this.handleItemClick} > fg</Menu.Item>
                    </Menu>
                </Grid.Column>

                <Grid.Column stretched width={12}>
                        <div>
                            <Segment>
                                {this.props.comp}
                            </Segment>
                        </div>
                </Grid.Column>
            </Grid>
        )
    }
}

// <Switch>
// <Route path="/" component={MailList} />
// <Route path="/:id" component={Mail} />
// </Switch>
//
// <Switch>
//     <Route exact path="/" component={Home} />
//     <Route path="/mail" component={Mail} />
//     <Route path="/maillist" component={MailList} />
// </Switch>