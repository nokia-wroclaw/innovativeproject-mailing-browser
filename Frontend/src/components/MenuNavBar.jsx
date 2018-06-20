import React, { Component } from 'react'
import { Menu, Container, Image,Dropdown,Reveal} from 'semantic-ui-react'
import myImage from './nokia.png';

export default class MenuNavBar extends Component {
    constructor(){
        super();
        this.state={
            color: 'blue'
        }
    }

  render() {
    return (
      <div>
          <Menu color={this.state.color} inverted>
              <Container>
                  <Menu.Item as='a' header href="/home/mail">
                      <Reveal animated='rotate left'>
                          <Reveal.Content visible>
                              <Image size='tiny' src={myImage} style={{ marginRight: '1.5em' }} />
                          </Reveal.Content>
                          <Reveal.Content hidden>
                              <Image size='tiny' src={myImage} style={{ marginRight: '1.5em' }} />
                          </Reveal.Content>
                      </Reveal>

                      Mailing Groups Browser
                  </Menu.Item>
                  <Menu.Item as='a'>Home</Menu.Item>
                  <Menu.Menu position='right'>
                      <Dropdown text='Personalization' pointing className='link item'>
                          <Dropdown.Menu>
                              <Dropdown.Header>Choose color</Dropdown.Header>
                              <Dropdown.Divider />
                              <Dropdown.Item onClick={() => this.setState({color: 'black'})}>Black</Dropdown.Item>
                              <Dropdown.Item onClick={() => this.setState({color: 'red'})}>Red</Dropdown.Item>
                              <Dropdown.Item onClick={() => this.setState({color: 'blue'})}>Blue</Dropdown.Item>
                              <Dropdown.Item onClick={() => this.setState({color: 'pink'})}>Pink</Dropdown.Item>
                              <Dropdown.Item onClick={() => this.setState({color: 'violet'})}>Violet</Dropdown.Item>
                          </Dropdown.Menu>
                      </Dropdown>
                  </Menu.Menu>
              </Container>
          </Menu>
      </div>
    )
  }
}