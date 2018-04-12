import React, {Component} from 'react';
import '../App.css';
import {Grid, Menu, Segment, Image} from 'semantic-ui-react'
import axios from 'axios';
import _ from 'lodash';
import {Link} from 'react-router-dom'
//import myImage from '/../mailImage.png';


export default class MenuMail extends Component {
    constructor() {
        super();
        this.state = {
            mail: null,
            threads: []
        };
    }

    getAllThreads() {
        axios.get("/")
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
        let string = "";
        for (let x = 0; x<5 ; x++){
           // string += (this.state.threads.length > 0 ? this.state.threads[num].Text[x] : null)
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
            return (
                <Grid.Row color='olive' key={k} name={k.toString()}>
                    <Grid.Column width={3}>
                        {/*<Image src = {myImage} />*/}
                    </Grid.Column>
                    <Grid.Column width={13}>
                        <Link to={"/singleThread/" + k } style={{color: 'black'}}>
                        <div>
                            {this.renderMails(k)}
                        </div>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
        )
        });

        return (
            <Grid celled>
                {mails}
            </Grid>
        )
    }
}