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

        return (
            <Segment>
                Autor maila, <br/>
                Tresc maila
            </Segment>


        )
    }
}

//<Segment>
//    {this.state.mails.length > 0 && this.state.mails ? this.state.mails[0].name : null}
//</Segment>
