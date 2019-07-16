import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'

import size from './breakpoints'
import GlobalStyle from './GlobalStyle'
import Seo from './Seo'
import Header from './Header/Header'

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

const Container = props => {
  const { title, children, here } = props
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <GlobalStyle />
        <Seo title={title} />
        <Header here={here} />
        <Site>{children}</Site>
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
