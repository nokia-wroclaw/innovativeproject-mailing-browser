import React, { Component } from 'react'
import { Menu, Container, Image,Dropdown} from 'semantic-ui-react'
import myImage from './nokia.png';

export default class MenuNavBar extends Component {
    constructor(){
        super();
        this.state={
            color: 'black'
        }
    }

  render() {
    return (
      <div>
          <Menu color={this.state.color} inverted>
              <Container>
                  <Menu.Item as='a' header href="/home/mail">
                      <Image size='tiny' src={myImage} style={{ marginRight: '1.5em' }} />
                      Mailing Group Browser
                  </Menu.Item>
                  <Menu.Item as='a'>Home</Menu.Item>
                  <Menu.Menu position='right'>
                      <Dropdown text='Personalizacja' pointing className='link item'>
                          <Dropdown.Menu>
                              <Dropdown.Header>Wybierz kolor</Dropdown.Header>
                              <Dropdown.Divider />
                              <Dropdown.Item onClick={() => this.setState({color: 'black'})}>Czarny</Dropdown.Item>
                              <Dropdown.Item onClick={() => this.setState({color: 'red'})}>Czerwony</Dropdown.Item>
                              <Dropdown.Item onClick={() => this.setState({color: 'blue'})}>Niebieski</Dropdown.Item>
                              <Dropdown.Item onClick={() => this.setState({color: 'pink'})}>Różowy</Dropdown.Item>
                              <Dropdown.Item onClick={() => this.setState({color: 'violet'})}>Fioletowy</Dropdown.Item>
                          </Dropdown.Menu>
                      </Dropdown>
                  </Menu.Menu>
              </Container>
          </Menu>
      </div>
    )
  }
}