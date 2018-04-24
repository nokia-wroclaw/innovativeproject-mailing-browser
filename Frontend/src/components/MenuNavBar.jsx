import React, { Component } from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class MenuNavBar extends Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu pointing secondary>
            <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick}> <Link to={"/home/mail"}> Mailing group browser  </Link> </Menu.Item>
        </Menu>
      </div>
    )
  }
}