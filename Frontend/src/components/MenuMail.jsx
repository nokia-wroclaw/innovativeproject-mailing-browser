import React, {Component} from 'react';
import '../App.css';
import {Container, Item, Segment} from 'semantic-ui-react'
import axios from 'axios';
import _ from 'lodash';
import {Link} from 'react-router-dom'
import myImage from './mailImage.png';
import Image from 'react-image-resizer';
import './MenuMail.css';
export default class MenuMail extends Component {
    constructor() {
        super();
        this.state = {
            mail: null,
            threads: []
        };
    }

    getAllThreads() {
        axios.get("/api/threads")
            .then((response) => {
                console.log(response);
                this.setState({
                    threads: response.data,
                    total: response.data.length
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        this.props.history.push('/home/mail');
        this.getAllThreads();
        console.log('too');

        console.log(this.state.threads);

    }

    getNotFullContent(num){
        let textLength = 50;
        let string = "";
        let stringShortText = this.state.threads[num].Text ? this.state.threads[num].Text : "";

        if(stringShortText.length < textLength){
        string = stringShortText;
            return string;
        }

        for (let x = 0; x<textLength ; x++){
            string += (this.state.threads[num].Text && this.state.threads[num].Text[x] ? this.state.threads[num].Text[x] : "")
        }
            return string+"...";
    }

    renderMails(num) {
        return <div >
            <h2>{this.state.threads ? this.state.threads[num].Subject : null}</h2>
            <h4>Data: {this.state.threads[num].Date} </h4>
            <h4>Od: {this.state.threads[num].From} </h4>
            <p>{this.getNotFullContent(num)}</p>
        </div>
    }

    render() {

        const mails = _.map(this.state.threads, (mail, k) => {
           var kk = k+1;
            return (
                <Item>
                    <Image
                        src = {myImage}
                        width={150}
                        height={150}
                    />
                        <Link to={'/singleThread/' + mail.id } style={{color: 'black'}}>
                        <div>
                            {this.renderMails(k)}
                        </div>
                        </Link>
                </Item>
            )
        });

        return (
            <Container text>
                <Segment padded='very' tertiary>
            <Item.Group divided>
                {mails}
            </Item.Group>
            </Segment>
            </Container>

        )
    }
}