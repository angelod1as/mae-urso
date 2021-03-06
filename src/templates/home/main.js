import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import uuid from 'uuid/v1'

import Container from '../../components/container'
import Open from './open'
import Features from './features'
import Call from './call'
import BlogRoll from './blogroll'
import CardapioRoll from './cardapioroll'

const Main = props => {
  const { data, location } = props
  const { pathname } = location
  const { edges } = data.allMarkdownRemark

  const compare = (a, b) => {
    const x = a.node.frontmatter.order
    const y = b.node.frontmatter.order
    if (x < y) {
      return -1
    }
    if (x > y) {
      return 1
    }
    return 0
  }
  edges.sort(compare)

  return (
    <Container title="Home" here={pathname}>
      {edges.map(each => {
        const { html, frontmatter, fields } = each.node
        const { slug } = fields
        switch (slug) {
          case 'opening':
            return <Open key={uuid()} {...frontmatter} html={html} />
          case 'blog':
            return <BlogRoll key={uuid()} {...frontmatter} html={html} />
          case 'cardapios':
            return <CardapioRoll key={uuid()} {...frontmatter} html={html} />
          case 'call':
          case 'paes':
            return <Call key={uuid()} {...frontmatter} html={html} />
          case 'features':
            return <Features key={uuid()} {...frontmatter} html={html} />
          default:
            return null
        }
      })}
    </Container>
  )
}

Main.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            html: PropTypes.string,
          }),
        })
      ),
    }),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

export const homeQuery = graphql`
  {
    allMarkdownRemark(filter: { fields: { type: { eq: "home" } } }) {
      edges {
        node {
          html
          fields {
            slug
            type
            fullPath
          }
          frontmatter {
            order
            background {
              relativePath
            }
          }
        }
      }
    }
  }
`

export default Main
