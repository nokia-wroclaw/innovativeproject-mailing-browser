import React, {Component} from 'react';
import '../App.css';
import {Grid, Menu, Segment} from 'semantic-ui-react'
import axios from 'axios';


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

    renderMailName() {
        return (
            <Segment>
                {this.state.mail.name}
            </Segment>
        );
    }

    renderMailSubject(num) {

        console.log("toaktywne:  " + this.activeItem);
        console.log(this.activeItem === '0');
        console.log("maile2:");
        console.log(this.state.mails);

        return (
            this.state.mails ? this.state.mails[num].subject : null
        );
    }

    render() {
        let {activeItem} = this.state;

        console.log("toaktywne222:  " + this.activeItem);
        console.log("toaktywne222tt:  " + activeItem);
        console.log("thisstate:  " + this.state);
        return (

            <Grid>
                <Grid.Column width={4}>
                    <Menu fluid vertical tabular>
                        <Menu.Item name='0' active={activeItem === '0'}
                                   onClick={this.handleItemClick}> {this.state.mails.length > 0 ? this.renderMailSubject(0) : null} </Menu.Item>
                        <Menu.Item name='1' active={activeItem === '1'}
                                   onClick={this.handleItemClick}> {this.state.mails.length > 0 ? this.renderMailSubject(0) : null}  </Menu.Item>
                        <Menu.Item name='2' active={activeItem === '2'}
                                   onClick={this.handleItemClick}> {this.state.mails.length > 0 ? this.renderMailSubject(1) : null}  </Menu.Item>
                        <Menu.Item name='3' active={activeItem === '3'}
                                   onClick={this.handleItemClick}> {this.state.mails.length > 0 ? this.renderMailSubject(2) : null} </Menu.Item>
                    </Menu>
                </Grid.Column>

                <Grid.Column stretched width={12}>
                    <div>
                        {this.state.mail ? this.renderMailName() : null}
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