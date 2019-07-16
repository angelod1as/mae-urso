import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import uuid from 'uuid/v1'

import Container from '../../components/Container'

const Menus = props => {
  const { data, location } = props
  const { pathname } = location
  const { edges } = data.allMarkdownRemark
  return (
    <Container title="Menus" here={pathname}>
      <h1>Menus</h1>
      {edges.map(each => {
        const { frontmatter, fields } = each.node
        return (
          <Link key={uuid()} to={fields.fullPath}>
            {frontmatter.title}
          </Link>
        )
      })}
    </Container>
  )
}

Menus.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string,
            }),
            fields: PropTypes.shape({
              fullPath: PropTypes.string,
            }),
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
    allMarkdownRemark(filter: { fields: { type: { eq: "menus" } } }) {
      edges {
        node {
          html
          fields {
            fullPath
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`

export default Menus
