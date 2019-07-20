import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'

import size from './breakpoints'
import GlobalStyle from './GlobalStyle'
import Seo from './Seo'
import Header from './Header/Header'

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
  padding-bottom: 50px;
`

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
