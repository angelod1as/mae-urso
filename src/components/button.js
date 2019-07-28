import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

export const Button = styled.div`
  display: flex;

  a {
    margin: 0 auto;
    font-family: ${p => p.theme.font.display};
    text-transform: uppercase;
    margin: 40px 20px;
    width: 100%;
    display: block;
    color: ${p => p.theme.color.white};
    background-color: ${p => p.theme.color.color};
    box-shadow: 0px 5px 0px 0px ${p => p.theme.color.darker};
    padding: 20px;
    border-radius: 5px;
    text-decoration: none;
    text-align: center;
    transition: all 0.1s;

    &:hover {
      background-color: ${p => p.theme.color.lighter};
      transform: translate(0, -5px);
      box-shadow: 0px 9px 5px 1px ${p => p.theme.color.darker};
    }
  }
`

const Call = ({ children }) => {
  return (
    <Button>
      <Link to="/">{children}</Link>
    </Button>
  )
}

Call.propTypes = {
  children: PropTypes.string.isRequired,
}

export default Call
