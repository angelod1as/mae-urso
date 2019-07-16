import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import parse from 'html-react-parser'
import uuid from 'uuid/v1'

import Seo from '../../components/Seo'

const Main = ({ data }) => {
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
    <Fragment>
      <Seo title="Home" />
      <h1>main</h1>
      {edges.map(each => {
        const { html } = each.node
        return <div key={uuid()}>{parse(html)}</div>
      })}
    </Fragment>
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
            type
          }
        }
      }
    }
  }
`

export default Main
