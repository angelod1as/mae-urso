import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import parse, { domToReact } from 'html-react-parser'
import size from '../../components/breakpoints'

const Open = styled.div`
  margin: 0 auto;
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;

  text-align: center;

  h1 {
    margin: 0;
  }

  span {
    transition: all 0.1s;
  }

  a {
    margin: 50px;
    padding: 0;
    width: 100%;
    text-decoration: none;
    &:hover {
      picture span {
        transform: scale(0.97);
      }
    }
  }

  @media ${size.medium} {
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
