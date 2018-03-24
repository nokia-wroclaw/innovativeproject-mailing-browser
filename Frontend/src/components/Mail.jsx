import React, { Component } from 'react';
import '../App.css';
import { Grid, Menu, Segment } from 'semantic-ui-react'
import { request } from 'http';
import axios from 'axios';

export default class Mail extends Component {

    constructor(){
        super();
        this.state = {
            mails: [],
            activeItem: 'mail1',
            text: 'fsfdsfsdsdf',
            name: 'def'
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
                console.log('error');
                console.log(error);
            });
    }

    getOne = (index) => {
    return axios.get("db.json")
.then( response => response.data[index]);
};

    render() {
        const { activeItem } = this.state;

        this.getOne(1).then((result) => {
            console.log("coss");
            console.log(result);
        });

        return (

            <Grid>
            <Grid.Column width={4}>
            <Menu fluid vertical tabular>
        <Menu.Item  name='mail1' active={activeItem === 'mail1'} onClick={this.handleItemClick}> {this.props.match.params.id}</Menu.Item>
        <Menu.Item  name='mail2' active={activeItem === 'mail2'} onClick={this.handleItemClick} > 2 </Menu.Item>
        <Menu.Item  name='mail3' active={activeItem === 'mail3'} onClick={this.handleItemClick} > 3 </Menu.Item>
        <Menu.Item  name='mail4' active={activeItem === 'mail4'} onClick={this.handleItemClick} > 4 </Menu.Item>
        </Menu>
    </Grid.Column>

        <Grid.Column stretched width={12}>
            <div>
                <Segment>
                    {this.state.mails.length > 0 && this.state.mails ? this.state.mails[0].name : null}
                </Segment>
            </div>
            </Grid.Column>
        </Grid>

        )
    }
}

//<Segment>
//    {this.state.mails.length > 0 && this.state.mails ? this.state.mails[0].name : null}
//</Segment>
