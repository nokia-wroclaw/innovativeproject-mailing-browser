import React, {Component} from 'react';
import '../App.css';
import { Container, Header, Reveal } from 'semantic-ui-react'
import {Grid} from 'semantic-ui-react'
import axios from 'axios';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Item } from 'semantic-ui-react'
import _ from 'lodash';
import { Button } from 'semantic-ui-react'


export default class SingleThread extends Component {
    constructor() {
        super();
        this.state = {
            mails: null,
            visible: [1,1,1,1]
        };
    }

    getOneMail = (index) => {
        var url = "/api/threads/";

        return axios.get(url + index)
            .then(response => response.data);
    };

    componentDidMount() {
        this.getOneMail(this.props.match.params.id).then((result) => {
            this.setState({mails: result});
        });
    }

    changeVisible = key => {
        let tab = this.state.visible;
        console.log("klucz");
        console.log(key);
        if(this.state.visible[key] === 1) {
           tab[key] = 0;
        }
        else {
            tab[key] = 1;
        }
        this.setState({
            visible: tab
        })

        //let s="sfsdf,ddddd";
       // let s2 = s.split(',');
       // console.log(s + '____' + s2[1]);
    };

    renderMailNameAndContent() {
        const html = _.map(this.state.mails, (mail,k) => {
            //console.log("mail,k");
            //console.log(mail);
            //console.log(k);
            if(k===0){
                let fullMainMailAsHtml = mail.TextAsHtml.split("<td style=\"width: 55px; padding-top: 18px;\">");
                let MainMailNoAvast = fullMainMailAsHtml[0];

                return(
                <div key={k} style={{marginLeft: `${100 * k}px`}}>
                    {ReactHtmlParser(MainMailNoAvast)}
                </div>
                )
            }
else {
                let fullMailAsHtml = mail.TextAsHtml;

                var indexStartAvast = fullMailAsHtml.indexOf("<tr>");
                var indexEndAvast = fullMailAsHtml.indexOf("</tr>");

                let fullMailNoAvast = fullMailAsHtml.slice(0,indexStartAvast-1) + fullMailAsHtml.substring(indexEndAvast+5);

                let str = fullMailNoAvast. split("<hr style=\"display:inline-block;width:98%\" tabindex=\"-1\">");
                let mailBody = str[0];
                let mailQuotes = str[1];


                if (this.state.visible[k] === 0) {
                    return (
                        <div key={k} style={{marginLeft: `${100 * k}px`}}>
                            {ReactHtmlParser(mailBody)}
                            <Button content='Primary' color='grey' key={k} size='mini' onClick={() => this.changeVisible(k)}>Rozwiń</Button>
                        </div>
                    )
                }
                else {
                    return (
                        <div key={k} style={{marginLeft: `${100 * k}px`}}>
                            {ReactHtmlParser(mailBody)}
                            <Button content='Primary' color='grey' key={k} size='mini' onClick={() => this.changeVisible(k)}>Schowaj</Button>
                            {ReactHtmlParser(mailQuotes)}
                        </div>
                    )
                }
            }
        });

        //console.log("reszta");
        //console.log(this.state.mails);
        //console.log(html);

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

                    <Header as ='h2'>{this.state.mails ? this.state.mails[0].Subject : null}</Header>
                    <Header as ='h5'>{this.state.mails ? this.state.mails[0].Date : null}</Header>
                    {this.state.mails ? this.renderMailNameAndContent() : null}
                </Container>
            </div>
        )
    }
}