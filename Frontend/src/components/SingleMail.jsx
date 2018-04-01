import React, {Component} from 'react';
import '../App.css';
import { Container, Header } from 'semantic-ui-react'
import axios from 'axios';


export default class SingleMail extends Component {
    constructor() {
        super();
        this.state = {
            mail: null
        };
    }

    getOneMail = (index) => {
        return axios.get("/db.json")
            .then(response => response.data.mail[index]);
    };

    componentDidMount() {
        console.log("didmount");

        this.getOneMail(this.props.match.params.id).then((result) => {
            this.setState({mail: result, activeItem: this.props.match.params.id ? this.props.match.params.id : '0'});
        });
    }


    renderMailNameAndContent() {
        return (
            <div>
                <br/>
                <h5>{this.state.mail.content}</h5>
            </div>
        );
    }

    render() {

        return (
            <div>
            <Container text>
                <Header as ='h2'>{this.state.mail ? this.state.mail.subject : null}</Header>
                Od kogo<br/>
                Do kogo<br/>
                Inne szczegóły<br/>

                {this.state.mail ? this.renderMailNameAndContent() : null}
            </Container>
            </div>
        )
    }
}