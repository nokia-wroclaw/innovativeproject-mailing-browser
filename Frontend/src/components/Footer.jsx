import React, { Component } from 'react';
import {Segment,Container,Grid,Header,List} from 'semantic-ui-react';


export default class Footer extends Component {

    render() {
        return (
            <Segment inverted vertical style={{ padding: '3em 0em' }}>
                <Container>
                    <Grid divided inverted stackable>
                        <Grid.Row>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='About' />
                                <List link inverted>
                                    <List.Item as='a'>Sitemap</List.Item>
                                    <List.Item as='a'>Contact Us</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='Media' />
                                <List link inverted>
                                    <List.Item as='a'>Github link</List.Item>
                                    <List.Item as='a'>Heroku</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <Header as='h4' inverted>
                                    Mailing Groups Browser
                                </Header>
                                <p>
                                   This is app made for project created with NOKIA to manage mails and informations send by NOKIA workers.
                                    You can sort, search and browse mails here.
                                </p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        )
    }
}