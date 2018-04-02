import React, {Component} from 'react';
import '../App.css';
import {Grid, Menu, Segment} from 'semantic-ui-react'
import axios from 'axios';
import _ from 'lodash';
import {Link} from 'react-router-dom'


export default class MenuMail extends Component {
    constructor() {
        super();
        this.state = {
            mail: null,
            mails: [],
            activeItem: '0'
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
            this.setState({mail: result, activeItem: this.props.match.params.id ? this.props.match.params.id : '0'});
        });
        this.getAllMails();
    }

    handleItemClick = (e, {name}) => {
        this.props.history.push('/mail/' + name);
        this.getOneMail(name).then((result) => {
            this.setState({mail: result, activeItem: name})
        });
    };

    renderMailNameAndContent() {
        return (
            <Segment>
                <Link to={"/singlemail/" + this.state.activeItem}>  <h3>{this.state.mail.name} </h3> </Link>
                <br/>
                <h5>{this.state.mail.content}</h5>
            </Segment>
        );
    }

    getNotFullContent(num){
        let string = "";
        for (let x = 0; x<50 ; x++){
            string += (this.state.mails.length > 0 ? this.state.mails[num].content[x] : null)
        }
return string+"...";
    }

    renderMailSubject(num) {
        return <div>
            <h2>  {this.state.mails ? this.state.mails[num].subject : null}</h2>
            <p>{this.getNotFullContent(num)}</p>
        </div>
    }

    render() {
        const {activeItem} = this.state;

        const mails = _.map(this.state.mails, (mail, k) => {
            return <Menu.Item key={k} name={k.toString()} active={activeItem === k.toString()}
                              onClick={this.handleItemClick}>
                   {this.renderMailSubject(k)}
            </Menu.Item>;
        });

        return (
            <Grid>
                <Grid.Column width={4}>
                    <Menu fluid vertical tabular>
                        {mails}
                    </Menu>
                </Grid.Column>
                <Grid.Column stretched width={12}>
                    <div>
                        {this.state.mail ? this.renderMailNameAndContent() : null}
                    </div>
                </Grid.Column>
            </Grid>
        )
    }
}