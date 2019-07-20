import React, { Component } from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import uuid from 'uuid/v1'
import styled from 'styled-components'
import Fade from 'react-reveal/Fade'

// prettier-ignore
const list = [
  ['Home', '/'],
  ['Blog', '/blog'],
  ['cardapios', '/cardapios'],
  ['Pães', '/paes'],
  ['Contato', '/contato'],
  ['Sobre', '/sobre'],
]

const Hamburger = ({ open }) => {
  if (!open) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <path d="M0 7.5v5h50v-5zm0 15v5h50v-5zm0 15v5h50v-5z" />
      </svg>
    )
  }
  return 'CLOSED'
}

const Navigation = styled.div`
  position: fixed;
  bottom: 5px;
  left: 50%;
  width: 60px;
  height: 60px;
  margin-left: -30px;
  border-radius: 50%;
  background-color: ${p => p.theme.color.color};
  display: flex;
  z-index: 10;
  svg {
    margin-top: 3px;
    width: 80%;
    height: auto;
    fill: ${p => p.theme.color.white};
  }
`

const NavList = styled.div`
  background-color: ${p => p.theme.color.darkgray};
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99; */
`

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
    this.handleClick = this.handleClick.bind(this)
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
        <Fade bottom when={open}>
          <NavList>
            {list
              .filter(each => each[1] !== here)
              .map(each => (
                <Link key={uuid()} to={each[1]}>
                  {each[0]}
                </Link>
              ))}
          </NavList>
        </Fade>
        <Navigation>
          <button type="button" onClick={() => this.handleClick()}>
            <Hamburger open={open} />
          </button>
        </Navigation>
      </div>
    )
  }
}

Nav.propTypes = {
  here: PropTypes.string.isRequired,
}

export default Nav
