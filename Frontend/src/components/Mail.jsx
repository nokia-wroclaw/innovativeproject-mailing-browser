import React, {Component} from 'react';
import '../App.css';
import {Grid, Menu, Segment} from 'semantic-ui-react'
import axios from 'axios';
import _ from 'lodash';


export default class Mail extends Component {
    constructor() {
        super();
        this.state = {
            mail: null,
            mails: [],
            activeItem: '1',
            text: 'fsfdsfsdsdf',
            name: 'def'
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
        console.log("didmount");

        this.getOneMail(this.props.match.params.id).then((result) => {
            this.setState({mail: result, activeItem: this.props.match.params.id ? this.props.match.params.id : '0'});
        });

        this.getAllMails();

        console.log("maile:");
        console.log(this.state.mails[0]);
        console.log("mail:");
        console.log(this.state.mail);
    }

    componentDidUpdate() {
        console.log("didupdate");

    }

    handleItemClick = (e, {name}) => {
        this.props.history.push('/mail/' + name);

        this.getOneMail(name).then((result) => {
            this.setState({mail: result, activeItem: name})
        });

        console.log('click' + name);
    };

    renderMailNameAndContent() {
        return (
            <Segment>
                <h3>{this.state.mail.name} </h3>
                <br/>
                <h5>{this.state.mail.content}</h5>
            </Segment>
        );
    }

    renderMailSubject(num) {

        return (
            this.state.mails ? this.state.mails[num].subject : null
        );
    }


    render() {
        const {activeItem} = this.state;

        const mails = _.map(this.state.mails, (mail, k) => {
            return <Menu.Item key={k} name = {k.toString()} active={activeItem === k.toString() }
                              onClick={this.handleItemClick}> {this.state.mails.length > 0 ? this.renderMailSubject(k) : null} </Menu.Item>;
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

//<Segment>
//    {this.state.mails.length > 0 && this.state.mails ? this.state.mails[0].name : null}
//</Segment>
//<Link to={"/mail/" + this.state.activeItem}> 1</Link>