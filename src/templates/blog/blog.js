import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import uuid from 'uuid/v1'

import Container from '../../components/Container'

const Blog = props => {
  const { data, location } = props
  const { pathname } = location
  const { edges } = data.allMarkdownRemark
  return (
    <Container title="blog" here={pathname}>
      <h1>Blog</h1>
      {edges.map(post => {
        const { frontmatter, fields } = post.node
        return (
          <Link key={uuid()} to={fields.fullPath}>
            <p>{frontmatter.title}</p>
            <p>{frontmatter.date}</p>
          </Link>
        )
      })}
    </Container>
  )
}

Blog.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          frontmatter: PropTypes.shape({
            title: PropTypes.string,
            date: PropTypes.string,
          }),
          fields: PropTypes.shape({
            fullPath: PropTypes.string,
          }),
        })
      ),
    }),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

export const blogQuery = graphql`
  query MyQuery {
    allMarkdownRemark(filter: { fields: { type: { eq: "blog" } } }) {
      edges {
        node {
          fields {
            fullPath
          }
          frontmatter {
            title
            thumb
            date(formatString: "DD/MM/YYYY")
            descGroup {
              desc
              longdesc
            }
          }
        }
      }
    }
  }
`

export default Blog
