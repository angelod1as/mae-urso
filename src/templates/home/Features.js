import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import parse from 'html-react-parser'
import size from '../../components/breakpoints'

const Open = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  text-align: center;
`

// Abertura
const Features = ({ html }) => {
  return (
    <Open>
      <div>{parse(html)}</div>
    </Open>
  )
}

Features.propTypes = {
  html: PropTypes.string.isRequired,
}

export default Features
