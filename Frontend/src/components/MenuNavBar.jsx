import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import { Input } from 'semantic-ui-react'

export default class MenuNavBar extends Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu pointing secondary>
            <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick}> <Link to={"/mail/0"}> Home </Link> </Menu.Item>
          <Menu.Menu position='right'>
              <Input
                  icon={{ name: 'search', circular: true, link: true }}
                  placeholder='Search...'
              />
          </Menu.Menu>
        </Menu>

      </div>
    )
  }
}