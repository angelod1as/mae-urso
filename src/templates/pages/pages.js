import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import parse from 'html-react-parser'

import Container from '../../components/Container'

const Pages = props => {
  const { data, location } = props
  const { pathname } = location

  // checa se página existe
  if (data.markdownRemark !== null) {
    const { frontmatter, html } = data.markdownRemark
    return (
      <Container title={frontmatter.title} here={pathname}>
        <h1>{frontmatter.title}</h1>
        <div>{parse(html)}</div>
      </Container>
    )
  }
  return (
    <Container title="Não encontrado" here={pathname}>
      <h1>Página não encontrada</h1>
    </Container>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { fullPath: { eq: $path } }) {
      html
      frontmatter {
        title
        thumb
      }
    }
  }
`

Pages.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
      }),
      html: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

export default Pages
