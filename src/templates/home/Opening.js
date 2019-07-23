import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import parse from 'html-react-parser'
import size from '../../components/breakpoints'

const Open = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  background-image: ${p =>
    p.background
      ? `linear-gradient(rgba(20,20,20, .5), rgba(20,20,20, .5)), url(${p.background})`
      : 'none'};
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;

  text-align: center;
  color: ${p => p.theme.color.white};

  div {
    margin-bottom: 20px;
  }

  p,
  h1 {
    margin: 0;
    font-family: ${p => p.theme.font.display};
  }

  h1 {
    font-size: 3em;
    color: ${p => p.theme.color.white};
    @media ${size.small} {
      font-size: 5em;
    }
  }

  p {
    font-size: 1.3em;
  }
`

// Abertura
const Opening = ({ html, background }) => {
  return (
    <Open background={background}>
      <div>{parse(html)}</div>
    </Open>
  )
}

Opening.propTypes = {
  html: PropTypes.string.isRequired,
}

export default Opening
