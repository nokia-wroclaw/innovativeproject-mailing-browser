import React, {Component} from 'react';
import '../App.css';
import {Image as ImageComponent,Container, Item, Segment} from 'semantic-ui-react'
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

        console.log(this.state.mail);

    }

    getNotFullContent(num){
        let textLength = 50;
        let string = "";
        let stringShortText = num.Text.substring(0,50);

        // if(stringShortText.length < textLength){
        // string = stringShortText;
        //     return string;
        // }
        //
        // for (let x = 0; x<textLength ; x++){
        //     string += (this.state.threads[num].Text && this.state.threads[num].Text[x] ? this.state.threads[num].Text[x] : "")
        // }

        if(stringShortText!==num.Text)
            return stringShortText + '...';
        return stringShortText;
    }

    renderMails(num) {
        return (
            <Item>
                <Item.Image
                    src = {myImage}
                    width={150}
                    height={150}
                />
            <Item.Header>{this.state.threads ? this.state.threads[num].Subject : null}</Item.Header>
            <Item.Meta>
                Data: {this.state.threads[num].Date}
            </Item.Meta>
            <Item.Meta>
                Od: {this.state.threads[num].From}
            </Item.Meta>
            <Item.Description>{this.getNotFullContent(num)}</Item.Description>
        </Item>
        )
    }

    renderItem(mail,index){
        return(
            <Item key={index}>
                <Item.Image size='tiny' src={myImage}/>
                <Link to={'/singleThread/' + mail.id } style={{color: 'black'}}>
                <Item.Content>
                    <Item.Header>{mail.Subject}</Item.Header>
                    <Item.Meta>
                        <span className='price'>{mail.Date}</span>
                        <br/>
                        <span className='stay'>{mail.From}</span>
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

        const paragraph = <ImageComponent src='/assets/images/wireframe/short-paragraph.png' />
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