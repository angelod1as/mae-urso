import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import uuid from 'uuid/v1'
import parse from 'html-react-parser'

import Container from '../../components/Container'

const Opening = () => <div>OPENING</div>
// blog e cardápios
const Roll = () => <div>ROLL</div>
// features gerais
const Features = () => <div>Features</div>
// contatem agora e clube do pão
const Call = () => <div>Call</div>

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
        const { background } = frontmatter
        const { slug } = fields
        console.log(slug)
        switch (slug) {
          case 'opening':
            return <Opening key={uuid()} {...frontmatter} />
          case 'blog':
          case 'cardapios':
            return <Roll key={uuid()} {...frontmatter} />
          case 'call':
          case 'paes':
            return <Call key={uuid()} {...frontmatter} />
          case 'features':
            return <Features key={uuid()} {...frontmatter} />
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
            background
          }
        }
      }
    }
  }
`

export default Main
