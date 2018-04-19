import React, {Component} from 'react';
import '../App.css';
import {Image as ImageComponent,Container, Item, Segment} from 'semantic-ui-react'
import axios from 'axios';
import _ from 'lodash';
import {Link} from 'react-router-dom'
import myImage from './mailImage.png';
import Image from 'react-image-resizer';
import './MenuMail.css';
import { Menu } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'

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

        console.log(this.state.mail);

    }

    getNotFullContent(mail){
        let stringShortText = mail.Text.substring(0,50);

        if(stringShortText!==mail.Text)
            return stringShortText + '...';
        return stringShortText;
    }

    renderItem(mail,index){
        return(
            <Item key={index}>
                <Item.Image size='tiny' src={myImage}/>
                <Link to={'/singleThread/' + mail.id } style={{color: 'black'}}>
                <Item.Content>
                    <Item.Header>{mail.Subject}</Item.Header>
                    <Item.Meta>
                        <span className='price'>Data: {mail.Date}</span>
                        <br/>
                        <span className='stay'> Od: {mail.From}</span>
                    </Item.Meta>
                    <Item.Description>{this.getNotFullContent(mail)}</Item.Description>
                </Item.Content>
                </Link>
            </Item>
        )

    }

    render() {

        const mails = _.map(this.state.threads, (mail, k) => {
            return    this.renderItem(mail,k)
        });

        return (
            <Container text>
                <Segment tertiary>
                    <Input fluid icon={{ name: 'search', circular: true, link: true }} placeholder='Search...' />
            <Item.Group divided>
                {mails}
            </Item.Group>
                </Segment>
            </Container>
        )
    }
}