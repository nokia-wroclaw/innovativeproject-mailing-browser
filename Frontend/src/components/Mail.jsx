import React, { Component } from 'react';
import '../App.css';
import { Grid, Menu, Segment } from 'semantic-ui-react'
import { request } from 'http';
import axios from 'axios';

export default class Mail extends Component {

    constructor() {
        super();
        this.state = {
            mails: {}
        };
    }

    getOne = (index) => {
        return axios.get("db.json")
            .then(response => response.data[index]);
    };

    render() {

        return (
                    <Segment>
                        {this.getOne(1).then((result) => {
                            console.log(result);
                        })}
                    </Segment>
        )
    }
}