import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'
import GlobalStyle from './GlobalStyle'
import SEO from './Seo'

import Header from './Header'

import size from './breakpoints'

const theme = {
  color: {
    color: '#19006A',
    white: '#F4F4F4',
    black: '#333333',
    gray: '#CCCCCC',
    darkgray: '#A9A9A9',
  },
  font: {
    display: 'Montserrat Alternates',
    text: 'Montserrat',
  },
}

const Site = styled.div``

const Container = ({ title, children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <GlobalStyle />
        <SEO title={title} />
        <Header />
        <Site>{children}</Site>
      </Fragment>
    </ThemeProvider>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
}

export default Container
