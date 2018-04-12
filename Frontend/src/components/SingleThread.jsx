import React, {Component} from 'react';
import '../App.css';
import { Container, Header } from 'semantic-ui-react'
import {Grid} from 'semantic-ui-react'
import axios from 'axios';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

export default class SingleThread extends Component {
    constructor() {
        super();
        this.state = {
            mail: null
        };
    }

    getOneMail = (index) => {
       // return axios.get("/db.json")
        var url = "/SingleThread/";

        return axios.get(url + index + '/')
            .then(response => response.data[0]);
    };

    componentDidMount() {
        this.getOneMail(this.props.match.params.id).then((result) => {
            this.setState({mail: result});
        });
    }


    renderMailNameAndContent() {
        var html = this.state.mail.TextAsHtml;

        return (
            <div>
                <br/>
                {ReactHtmlParser(html)}
            </div>
        );
    }

    render() {
        return (
            <div>
                <Grid celled>
                    <Grid.Row>
                <Container text>
                    <Header as ='h2'>{this.state.mail ? this.state.mail.Subject : null}</Header>
                    <Header as ='h5'>{this.state.mail ? this.state.mail.Date : null}</Header>
                    {this.state.mail ? this.renderMailNameAndContent() : null}
                </Container>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}