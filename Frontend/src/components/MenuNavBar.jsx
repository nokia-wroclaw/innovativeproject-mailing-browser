import React, { Component } from 'react'
import { Menu, Container, Image} from 'semantic-ui-react'
import myImage from './nokia.png';

export default class MenuNavBar extends Component {

  render() {
    return (
      <div>
          <Menu inverted>
              <Container>
                  <Menu.Item as='a' header href="/home/mail">
                      <Image size='tiny' src={myImage} style={{ marginRight: '1.5em' }} />
                      Mailing Group Browser
                  </Menu.Item>
                  <Menu.Item as='a'>Home</Menu.Item>
              </Container>
          </Menu>
      </div>
    )
  }
}