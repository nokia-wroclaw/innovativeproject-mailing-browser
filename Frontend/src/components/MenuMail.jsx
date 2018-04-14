import React, {Component} from 'react';
import '../App.css';
import {Container, Item} from 'semantic-ui-react'
import axios from 'axios';
import _ from 'lodash';
import {Link} from 'react-router-dom'
import myImage from './mailImage.png';
import Image from 'react-image-resizer';

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

    getOneMail = (index) => {
        var url = "/SingleThread";

        return axios.get(url + index + '/')
            .then(response => response.data[0]);
    };

    componentDidMount() {
        // this.getOneMail(this.props.match.params.id).then((result) => {
        //     this.setState({mail: result});
        // });
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
        //console.log('rendermails');
       // console.log(this.state.threads);
        return <div>
            <h2>{this.state.threads ? this.state.threads[num].Subject : null}</h2>
             <h4>{this.state.threads[num].From} </h4>
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
                        //style={style.image}
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
            <Item.Group divided>
                {mails}
            </Item.Group>
            </Container>

        )
    }
}