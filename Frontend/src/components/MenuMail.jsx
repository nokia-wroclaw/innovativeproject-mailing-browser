import React, {Component} from 'react';
import '../App.css';
import {Grid, Menu, Segment, Image} from 'semantic-ui-react'
import axios from 'axios';
import _ from 'lodash';
import {Link} from 'react-router-dom'
//import myImage from '/mailImage.png';


export default class MenuMail extends Component {
    constructor() {
        super();
        this.state = {
            mail: null,
            mails: []
        };
    }

    getAllMails() {
        axios.get("/db.json")
            .then((response) => {
                console.log(response);
                this.setState({
                    mails: response.data.mail,
                    total: response.data.mail.length
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getOneMail = (index) => {
        return axios.get("/db.json")
            .then(response => response.data.mail[index]);
    };

    componentDidMount() {
        this.getOneMail(this.props.match.params.id).then((result) => {
            this.setState({mail: result});
        });
        this.getAllMails();
    }

    getNotFullContent(num){
        let string = "";
        for (let x = 0; x<50 ; x++){
            string += (this.state.mails.length > 0 ? this.state.mails[num].content[x] : null)
        }
return string+"...";
    }

    renderMails(num) {
        return <div>
            <h2>{this.state.mails ? this.state.mails[num].subject : null}</h2>
             <h4>{this.state.mails[num].name} </h4>
            <p>{this.getNotFullContent(num)}</p>
        </div>
    }

    render() {
        const mails = _.map(this.state.mails, (mail, k) => {
            return (
                <Grid.Row color='olive' key={k} name={k.toString()}>
                    <Grid.Column width={3}>
                        <Image src='/../mailImage.png' />
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