import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import uuid from 'uuid/v1'
import parse from 'html-react-parser'

import Container from '../../components/Container'

const Menus = props => {
  const { data, location } = props
  const { pathname } = location
  return (
    <Container title="Menus" here={pathname}>
      <h1>Menus</h1>
    </Container>
  )
}

Menus.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

export default Menus
