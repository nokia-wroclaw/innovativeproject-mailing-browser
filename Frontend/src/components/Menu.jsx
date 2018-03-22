import React, { Component } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import axios from 'axios';
import Mail from './Mail.jsx';
import MailList from './MailList';
//import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default class MenuExample extends Component {

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

    handleItemClick = (e, { name}) => this.setState({ activeItem: name});
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
                        <Menu.Item number = {0} name='bio' active={activeItem === 'bio'} onClick={this.getOne()} />
                        <Menu.Item number = {1} name='pics' active={activeItem === 'pics'} onClick={this.handleItemClick} />
                        <Menu.Item number = {2} name='companies' active={activeItem === 'companies'} onClick={this.handleItemClick} />
                        <Menu.Item number = {3} name='links' active={activeItem === 'links'} onClick={this.handleItemClick} />
                    </Menu>
                </Grid.Column>

                <Grid.Column stretched width={12}>
                        <div>
<MailList></MailList>

                        </div>
                </Grid.Column>
            </Grid>
        )
    }
}

{/*<Switch>*/}
{/*<Route path="/" component={MailList} />*/}
{/*<Route path="/:id" component={Mail} />*/}
{/*</Switch>*/}