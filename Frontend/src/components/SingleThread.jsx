import React, {Component} from 'react';
import '../App.css';
import { Container, Header } from 'semantic-ui-react'
import {Grid} from 'semantic-ui-react'
import axios from 'axios';

export default class SingleThread extends Component {
    constructor() {
        super();
        this.state = {
            mail: null
        };
    }

    getOneMail = (index) => {
       // return axios.get("/db.json")
        var url = "http://localhost:3000/mails/";

        return axios.get(url + index + '/')
            .then(response => response.data[0]);
    };

    componentDidMount() {
        this.getOneMail(this.props.match.params.id).then((result) => {
            this.setState({mail: result});
        });
    }


    renderMailNameAndContent() {
        return (
            <div>
                <br/>
                <h5>{this.state.mail.TextAsHtml}</h5>
                {/*<h5>{this.state.mail.content}</h5>*/}
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
                    Od kogo<br/>
                    Do kogo<br/>
                    Inne szczegóły<br/>
                    {this.state.mail ? this.renderMailNameAndContent() : null}
                </Container>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}