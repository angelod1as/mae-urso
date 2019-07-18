import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Nav from './Nav'

const H = styled.div``

const Header = ({ here }) => {
  const Top = styled.div``
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
