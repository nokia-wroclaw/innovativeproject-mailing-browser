import React, {Component} from 'react';
import '../App.css';
import { Container, Header } from 'semantic-ui-react'
import {Grid} from 'semantic-ui-react'
import axios from 'axios';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Item } from 'semantic-ui-react'
import _ from 'lodash';

export default class SingleThread extends Component {
    constructor() {
        super();
        this.state = {
            mails: null
        };
    }

    getOneMail = (index) => {
       // return axios.get("/db.json")
        var url = "/api/threads/";

        return axios.get(url + index)
            .then(response => response.data);
    };

    componentDidMount() {
        this.getOneMail(this.props.match.params.id).then((result) => {
            this.setState({mails: result});
        });
    }


    renderMailNameAndContent() {
        const html = _.map(this.state.mails, (mail,k) => {
            console.log("mail,k");
            console.log(mail);
            console.log(k);

            return( mail.TextAsHtml)
        });

        console.log("reszta");
        console.log(this.state.mails);
        console.log(html);

        return (
            <div>
                {ReactHtmlParser(html)}
            </div>
        );
    }

    render() {
        return (
            <div className="container-fluid">

                <Container text>
                    <Header as ='h2'>{this.state.mails ? this.state.mails[0].Subject : null}</Header>
                    <Header as ='h5'>{this.state.mails ? this.state.mails[0].Date : null}</Header>
                    {this.state.mails ? this.renderMailNameAndContent() : null}
                </Container>
            </div>
        )
    }
}