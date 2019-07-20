import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Nav from './Nav'

const H = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${p => p.theme.color.color};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;

  display: flex;
  justify-content: center;
  align-items: center;
`

const Top = styled.div`
  color: ${p => p.theme.color.white};
  font-family: ${p => p.theme.font.display};
  font-size: 1.3em;
`

const Header = ({ here }) => {
  return (
    <H>
      <Top>Mãe Urso</Top>
      <Nav here={here} />
    </H>
  )
}

Header.propTypes = {
  here: PropTypes.string.isRequired,
}

export default Header
