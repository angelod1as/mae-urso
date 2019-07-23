import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

export const Button = styled.div`
  display: flex;
  a {
    transition: all 0.2s;
    text-align: center;
    margin: 40px 20px;
    width: 100%;
    background-color: ${p => p.theme.color.color};
    padding: 20px;
    text-decoration: none;
    color: ${p => p.theme.color.white};
    font-family: ${p => p.theme.font.display};
    text-transform: uppercase;
    &:hover {
      background-color: ${p => p.theme.color.lighter};
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
