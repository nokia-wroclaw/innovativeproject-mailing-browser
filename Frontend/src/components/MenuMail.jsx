import React, {Component} from 'react';
import '../App.css';
import {Dropdown, Input, Container, Item, Segment, Image,Reveal,Pagination,Grid} from 'semantic-ui-react'
import axios from 'axios';
import _ from 'lodash';
import {Link} from 'react-router-dom'
import myImage from './mailImage.png';
import './MenuMail.css';
import moment from 'moment';
import socketIOClient from "socket.io-client";

export default class MenuMail extends Component {
    constructor() {
        super();
        this.state = {
            mail: null,
            threads: [],
            response: false,
            endpoint: "http://127.0.0.1:3000",
            activePage: 1,
            totalPages: 1
        };
    }
    componentDidMount() {
        this.props.history.push('/home/mail');
        this.getAllThreads('/api/threads');

        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);

        socket.on("thread", response => {
            console.log(response);
            this.setState({threads:[response,...this.state.threads]});
        });

        console.log("res:" + this.state.threads);

        // this.props.history.push('/home/mail');

    }

    getAllThreads(path) {
        console.log("yup");
        // "/api/threads"
        axios.get(path)
            .then((response) => {
                console.log(response);
                this.setState({
                    threads: response.data,
                    totalPages: response.data.length/7
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

parseAttachment(mail){

    let splittedImageHtml = mail.TextAsHtml.split("<img size");

if(splittedImageHtml.length===2) {
    let ImageHtml = splittedImageHtml[1];
    let tmp1 = ImageHtml.split("src=\"data:image/png;base64,");
    let tmp2 = tmp1[1].split("\">");
    let ImageBinary = tmp2[0];
    console.log(ImageBinary);
    return "data:image/jpeg;base64," + ImageBinary;
}

return myImage;
}
    getNotFullContent(mail) {
        let fullMailContent = (mail.Text ? mail.Text : "Mail posiada załącznik. Wejdź, by zobaczyć całość").split("[https://ipmcdn.avast.com/images/icons/icon-envelope-tick-round-orange-animated-no-repeat-v1.gif]");
        let stringShortText = fullMailContent[0].substring(0, 30);

        if (stringShortText !== fullMailContent[0])
            return stringShortText + '...';
        return stringShortText;
    }


    renderItem(mail, index) {

        if(index < this.state.activePage*7 && index > this.state.activePage*7-7) {
            return (
                <Item key={index}>
                    <Reveal animated='move'>
                        <Reveal.Content visible>
                            <Image src={this.parseAttachment(mail)} width="140px" height="100px"
                                   style={{padding: "10px"}}/>
                        </Reveal.Content>
                        <Reveal.Content hidden>
                            <Image src={myImage} width="140px" height="100px" style={{padding: "10px"}}/>
                        </Reveal.Content>
                    </Reveal>
                    <Link to={'/singleThread/' + mail.MessageId} style={{color: 'black'}}>
                        <Item.Content>
                            <Item.Header>{mail.Subject}</Item.Header>
                            <Item.Meta>
                                <span>Czas: {moment(mail.Date).format('DD/MM/YYYY, HH:mm')}</span>
                                <br/>
                                <span> Od: {mail.From}</span>
                            </Item.Meta>
                            <Item.Description>{this.getNotFullContent(mail)}</Item.Description>
                        </Item.Content>
                    </Link>
                </Item>
            )
        }

    }

    handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

    render() {
        const mails = _.map(this.state.threads, (mail, k) => {
            return this.renderItem(mail._source, k);
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
                <Grid centered columns={4}>
                <Grid.Column>
                <Pagination
                    activePage={this.state.activePage}
                    onPageChange={this.handlePaginationChange}
                    totalPages={this.state.totalPages}
                />
                </Grid.Column>
                </Grid>
            </div>
        )
    }
}