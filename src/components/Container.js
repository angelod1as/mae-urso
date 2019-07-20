import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'

import size from './breakpoints'
import GlobalStyle from './GlobalStyle'
import Seo from './Seo'
import Header from './Header/Header'
import Nav from './Header/Nav'

const theme = {
  color: {
    color: '#cc7000',
    darker: '#995400',
    lighter: '#ff981a',
    white: '#F4F4F4',
    black: '#333333',
    gray: '#CCCCCC',
    darkgray: '#A9A9A9',
  },
  font: {
    display: 'Amaranth',
    text: 'Lora',
  },
}

const Site = styled.div`
  padding-top: 50px;
  padding-bottom: 100px;
  & > h1 {
    margin-top: 60px;
  }

  &.full {
    @media ${size.medium} {
      margin: 0 auto;
    }
  }

  &.column {
    @media ${size.medium} {
      max-width: 600px;
      margin: 0 auto;
    }
  }
`

const Container = props => {
  const { title, children, here } = props
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <GlobalStyle />
        <Seo title={title} />
        <Header here={here} />
        <Site className={here === '/' ? 'full' : 'column'}>{children}</Site>
        <Nav here={here} />
      </Fragment>
    </ThemeProvider>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  here: PropTypes.string.isRequired,
}

export default Container
