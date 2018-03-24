import React, {Component} from 'react';
import '../App.css';
import {Grid, Menu, Segment} from 'semantic-ui-react'
import {request} from 'http';
import axios from 'axios';
import {Link} from 'react-router-dom'

export default class Mail extends Component {

    constructor() {
        super();
        this.state = {
            mail: null,
            activeItem: '1',
            text: 'fsfdsfsdsdf',
            name: 'def'
        };
    }

    getOne = (index) => {
        return axios.get("/db.json")
            .then(response => response.data.mail[index]);
    };

    componentDidMount() {

        this.getOne(this.props.match.params.id).then((result) => {
            this.setState({mail: result, activeItem: this.props.match.params.id});
        });
    }

    handleItemClick = (e, {name}) => {
        return <Link to={"/mail/"+name}>fdfdfd</Link>
    };

    renderMail() {
        return (
            <Segment>
                {this.state.mail.name}
            </Segment>
        );
    }

    render() {
        const {activeItem} = this.state;

        return (

            <Grid>
                <Grid.Column width={4}>
                    <Menu fluid vertical tabular>
                        <Menu.Item name='0' active={activeItem === '0'} onClick={this.handleItemClick}>1</Menu.Item>
                        <Menu.Item name='1' active={activeItem === '1'} onClick={this.handleItemClick}> 2 </Menu.Item>
                        <Menu.Item name='2' active={activeItem === '2'} onClick={this.handleItemClick}> 3 </Menu.Item>
                        <Menu.Item name='3' active={activeItem === '3'} onClick={this.handleItemClick}> 4 </Menu.Item>
                    </Menu>
                </Grid.Column>

                <Grid.Column stretched width={12}>
                    <div>
                        {this.state.mail ? this.renderMail() : null}
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