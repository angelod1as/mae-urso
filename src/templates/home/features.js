import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import parse, { domToReact } from 'html-react-parser'
import size from '../../components/breakpoints'

const Open = styled.div`
  min-height: 100vh;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  text-align: center;

  h1 {
    margin: 0;
  }

  p {
    margin: 20px 0;
  }

  a {
    margin: 30px 10px;
    padding: 0;
    width: 100%;
  }

  @media ${size.small} {
    flex-direction: row;
    justify-content: space-around;
  }
`

// Abertura
const Features = ({ html }) => {
  const options = {
    replace: ({ attribs, children }) => {
      if (attribs && attribs['data-to']) {
        return <a href={attribs['data-to']}>{domToReact(children, {})}</a>
      }
      return null
    },
  }
  const parsed = parse(html, options)
  return <Open>{parsed}</Open>
}

Features.propTypes = {
  html: PropTypes.string.isRequired,
}

export default Features
