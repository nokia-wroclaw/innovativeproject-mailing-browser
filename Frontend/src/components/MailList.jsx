import React, { Component } from 'react';
import '../App.css';
import { Grid, Menu, Segment } from 'semantic-ui-react'
import { request } from 'http';
import axios from 'axios';
import _ from 'lodash';


export default class MailList extends Component {

    constructor(){
        super();
        this.state = {
            mails: [],
            activeItem: 'mail1',
            text: 'fsfdsfsdsdf'
        };
    }

    componentWillMount(){
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
        const mails = _.map(this.state.mails, (mail, k) =>{
            return <li key = {k}> {mail.name} </li>;
        });

        const { activeItem } = this.state;

        return (
            <Grid>
                <Grid.Column width={4}>
                    <Menu fluid vertical tabular>
                        <Menu.Item  name='mail1' active={activeItem === 'mail1'} onClick={this.handleItemClick}> mail1</Menu.Item>
                        <Menu.Item  name='mail2' active={activeItem === 'mail2'} onClick={this.handleItemClick} > mail2</Menu.Item>
                        <Menu.Item  name='mail3' active={activeItem === 'mail3'} onClick={this.handleItemClick} > mail3</Menu.Item>
                        <Menu.Item  name='mail4' active={activeItem === 'mail4'} onClick={this.handleItemClick} > mail4</Menu.Item>
                    </Menu>
                </Grid.Column>

                <Grid.Column stretched width={12}>
                    <div>
                        <Segment>
                            {mails}
                        </Segment>
                    </div>
                </Grid.Column>
            </Grid>
        )
    }
}