import React, {Component} from 'react';
import '../App.css';
import {Segment} from 'semantic-ui-react'
//import { request } from 'http';
import axios from 'axios';
import _ from 'lodash';
import {Link} from 'react-router-dom'


export default class MailList extends Component {

    constructor() {
        super();
        this.state = {
            mails: [],
            activeItem: 'mail1',
            text: 'fsfdsfsdsdf'
        };
    }

    componentWillMount() {
        axios.get("/db.json")
            .then((response) => {
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
        const mails = _.map(this.state.mails, (mail, k) => {
            return <li key={k}><Link to={"/mail/" + k}> {mail.name}</Link></li>;
        });


        return (
            <Segment>
                {mails}
            </Segment>
        )
    }
}