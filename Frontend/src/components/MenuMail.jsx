import React, {Component} from 'react';
import '../App.css';
import {Dropdown, Input, Container, Item, Segment} from 'semantic-ui-react'
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
            threads: [],
        };
    }

    getAllThreads(path) {
        console.log("yup");
        // "/api/threads"
        axios.get(path)
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

    getSearchThreads = (e, {value}) => {
        if(value !== '') {
            axios.get("/search/" + value)
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
        else{
            this.getAllThreads('/api/threads');
        }
    }

    componentDidMount() {
        this.props.history.push('/home/mail');
        this.getAllThreads('/api/threads');
        console.log('too');

        console.log(this.state.mail);

    }

    getNotFullContent(mail) {
        let fullMailContent = mail.Text.split("[https://ipmcdn.avast.com/images/icons/icon-envelope-tick-round-orange-animated-no-repeat-v1.gif]");
        let stringShortText = fullMailContent[0].substring(0, 30);

        if (stringShortText !== fullMailContent[0])
            return stringShortText + '...';
        return stringShortText;
    }


    renderItem(mail, index) {
        console.log('renderitem');
        return (
            <Item key={index}>
                <Image src={myImage} height={100} width={160}/>
                <Link to={'/singleThread/' + mail.id} style={{color: 'black'}}>
                    <Item.Content>
                        <Item.Header>{mail.Subject}</Item.Header>
                        <Item.Meta>
                            <span>Data: {mail.Date}</span>
                            <br/>
                            <span> Od: {mail.From}</span>
                        </Item.Meta>
                        <Item.Description>{this.getNotFullContent(mail)}</Item.Description>
                    </Item.Content>
                </Link>
            </Item>
        )

    }

    render() {

        const mails = _.map(this.state.threads, (mail, k) => {
            return this.renderItem(mail, k);
        });

        return (
            <div>
                <Container text>
                    <Segment secondary>
                        <div align="center">
                            <Input onChange={this.getSearchThreads}
                                   icon={{name: 'search', circular: true, link: true}}
                                   placeholder='Szukaj...'/>
                            <Dropdown text='Sortowanie' icon='filter' floating labeled button className='icon'>
                                <Dropdown.Menu>
                                    <Dropdown.Header icon='tags' content='Sortuj po...'/>
                                    <Dropdown.Divider/>
                                    <Dropdown.Item onClick={() => this.getAllThreads('/api/threads')}>Dacie malejąco(od
                                        najnowszych)</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.getAllThreads('/threads/sort=ASC')}>Dacie
                                        rosnąco(od najstarszych)</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.getAllThreads('/threads/HotThreads')}>Popularności</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                        <Item.Group divided>
                            {mails}
                        </Item.Group>
                    </Segment>
                </Container>

            </div>
        )
    }
}