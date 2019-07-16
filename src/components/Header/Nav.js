import React, { Component } from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import uuid from 'uuid/v1'

// prettier-ignore
const list = [
  ['Home', '/'],
  ['Blog', '/blog'],
  ['Menus', '/menus'],
  ['Pães', '/paes'],
  ['Contato', '/contato'],
  ['Sobre', '/sobre'],
]

const Hamburger = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50">
    <path d="M0 7.5v5h50v-5zm0 15v5h50v-5zm0 15v5h50v-5z" />
  </svg>
)

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  handleClick() {
    const { open } = this.state
    this.setState({ open: !open })
  }

  render() {
    const { here } = this.props
    const { open } = this.state
    return (
      <div>
        <button type="button" onClick={() => this.handleClick()}>
          <Hamburger />
        </button>
        {open ? (
          <div>
            {list
              .filter(each => each[1] !== here)
              .map(each => (
                <Link key={uuid()} to={each[1]}>
                  {each[0]}
                </Link>
              ))}
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

Nav.propTypes = {
  here: PropTypes.string.isRequired,
}

export default Nav
