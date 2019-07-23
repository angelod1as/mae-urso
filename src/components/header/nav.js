import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'gatsby'
import uuid from 'uuid/v1'

// prettier-ignore
const list = [
  ['Home', '/'],
  ['Blog', '/blog'],
  ['Cardápios', '/cardapios'],
  ['Pães', '/paes'],
  ['Contato', '/contato'],
  ['Sobre', '/sobre'],
]

const Wrapper = styled.div`
  z-index: 20;
`

const List = styled.div`
  display: flex;
  transition: all 0.5s ease;
  bottom: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 0%;
  z-index: 19;

  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  padding: 100px 0;

  a {
    color: ${p => p.theme.color.white};
    text-decoration: none;
    font-size: 2em;
  }

  &.list-closed {
    opacity: 0;
    height: 0vh;
    overflow: hidden;
    pointer-events: none;
  }
  &.list-open {
    background-color: ${p => p.theme.color.color};
    opacity: 100;
    height: 100vh;
  }
`
const Button = styled.button`
  appearance: none;
  position: fixed;
  left: 50%;
  bottom: 0;
  width: 60px;
  height: 60px;
  margin-left: -30px;
  margin-bottom: 10px;
  border-radius: 50%;
  border: 1px solid ${p => p.theme.color.white};
  background-color: ${p => p.theme.color.color};
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.3);
  &:hover {
    background-color: ${p => p.theme.color.darker};
  }
  svg {
    width: 80%;
    height: auto;
    fill: ${p => p.theme.color.white};
  }
`

const Ham = styled.div`
  width: 80%;
  position: relative;
  height: 100%;

  div,
  div:after,
  div:before {
    width: 100%;
    height: 3px;
    background-color: ${p => p.theme.color.white};
  }

  &.button-open {
    div {
      &:after,
      &:before {
        top: 0;
      }
    }
  }

  div {
    margin: 0 auto;
    &:before,
    &:after {
      transition: all 0.3s ease;

      content: '';
      position: absolute;
      left: 0;
    }

    &:before {
      top: -10px;
    }

    &:after {
      top: 10px;
    }
  }
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
      <Wrapper>
        <Button type="button" onClick={() => this.handleClick()}>
          <Ham className={open ? 'button-open' : 'button-closed'}>
            <div />
          </Ham>
        </Button>
        <List className={open ? 'list-open' : 'list-closed'}>
          {list
            .filter(each => each[1] !== here)
            .map(each => (
              <Link key={uuid()} to={each[1]}>
                {each[0]}
              </Link>
            ))}
        </List>
      </Wrapper>
    )
  }
}

Nav.propTypes = {
  here: PropTypes.string.isRequired,
}

export default Nav
