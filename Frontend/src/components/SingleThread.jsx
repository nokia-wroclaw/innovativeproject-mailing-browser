import React, {Component} from 'react';
import '../App.css';
import {Container, Header, Reveal} from 'semantic-ui-react';
import {Segment} from 'semantic-ui-react';
import axios from 'axios';
import ReactHtmlParser, {processNodes, convertNodeToElement, htmlparser2} from 'react-html-parser';
import {Item} from 'semantic-ui-react'
import _ from 'lodash';
import {Button} from 'semantic-ui-react';
import './SingleThread.css';
import moment from 'moment';


export default class SingleThread extends Component {
    constructor() {
        super();
        this.state = {
            mails: null,
            visible: [1, 1, 1, 1]
        };
    }

    getOneMail = (index) => {
        var url = "/api/threads/";

        return axios.get(url + index)
            .then(response => response.data);
    };

    componentDidMount() {
        console.log("singlethrad:" + this.props.match.params.id);
        this.getOneMail(this.props.match.params.id).then((result) => {
            this.setState({mails: result});
            console.log("source:" + result);
            console.log(result);

        });
    }

    changeVisible = key => {
        let tab = this.state.visible;
        console.log("klucz");
        console.log(key);
        if (this.state.visible[key] === 1) {
            tab[key] = 0;
        }
        else {
            tab[key] = 1;
        }
        this.setState({
            visible: tab
        })

    };

    renderMailNameAndContent() {
        const html = _.map(this.state.mails, (mail, k) => {
            if (k === 0) {
                let fullMainMailAsHtml = mail._source.TextAsHtml.split("<td style=\"width: 55px; padding-top: 18px;\">");
                let MainMailNoAvast = fullMainMailAsHtml[0];

                return (
                    <div key={k} style={{marginLeft: `${80 * (k<3 ? k : 2)}px`}}>
                        <Segment padded>
                            {ReactHtmlParser(MainMailNoAvast)}
                        </Segment>
                        <br/>
                    </div>
                )
            }
            else {
                let fullMailAsHtml = mail._source.TextAsHtml;

                var indexStartAvast = fullMailAsHtml.indexOf("<tr>");
                var indexEndAvast = fullMailAsHtml.indexOf("</tr>");

                let fullMailNoAvast = fullMailAsHtml.slice(0, indexStartAvast - 1) + fullMailAsHtml.substring(indexEndAvast + 5);

                let str = fullMailNoAvast.split("<hr style=\"display:inline-block;width:98%\" tabindex=\"-1\">");
                let mailBody = str[0];
                let mailQuotes = str[1];


                if (this.state.visible[k] !== 0) {
                    return (
                        <div key={k} style={{marginLeft: `${80 * (k<3 ? k : 2)}px`}}>
                            <Segment padded>
                                {ReactHtmlParser(mailBody)}
                            </Segment>

                            <Button content='Primary' color='grey' key={k} size='mini'
                                    onClick={() => this.changeVisible(k)}>Rozwiń</Button>
                        </div>
                    )
                }
                else {
                    return (
                        <div key={k} style={{marginLeft: `${80 * (k<3 ? k : 2)}px`}}>
                            <Segment padded>
                                {ReactHtmlParser(mailBody)}
                            </Segment>
                            <Button content='Primary' color='grey' key={k} size='mini'
                                    onClick={() => this.changeVisible(k)}>Schowaj</Button>
                            <div key={k} style={{marginLeft: `${30 * (k<3 ? k : 2)}px`}}>
                                <Segment padded color={"yellow"} >
                                    <div>
                                    {ReactHtmlParser(mailQuotes)}
                                    </div>
                                </Segment>
                            </div>
                        </div>
                    )
                }
            }
        });


        return (
            <div>
                {html}
            </div>
        );
    }

    render() {
        return (

            <div className='hidden'>

                <Container text>
                    <Segment color='yellow'>
                        <Header as='h2'>{this.state.mails ? this.state.mails[0]._source.Subject : null}</Header>
                    </Segment>
                    <Segment tertiary>
                        <Header as='h5'> Wysłane: {moment(this.state.mails ? this.state.mails[0]._source.Date : null).format('DD/MM/YYYY, HH:mm:ss')}</Header>
                        Od: {this.state.mails ? this.state.mails[0]._source.From : null} <br/>
                        Do: {this.state.mails ? this.state.mails[0]._source.To : null}
                    </Segment>
                    {this.state.mails ? this.renderMailNameAndContent() : null}
                </Container>
            </div>
        )
    }
}