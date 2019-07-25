import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled from 'styled-components'
// import PropTypes from 'prop-types'
// import uuid from 'uuid/v1'

import Roll from './roll'

const Wrapper = styled.div`
  margin: 50px auto;
  h2 {
    margin-bottom: 50px;
    text-align: center;
  }
`

const BlogRoll = () => {
  return (
    <StaticQuery
      query={graphql`
        query BlogRoll {
          allMarkdownRemark(
            filter: {
              fields: { type: { eq: "blog" } }
              frontmatter: { others: { hide: { ne: true } } }
            }
            limit: 3
            sort: { order: DESC, fields: frontmatter___date }
          ) {
            edges {
              node {
                fields {
                  slug
                  type
                  fullPath
                }
                frontmatter {
                  title
                  thumbnail {
                    childImageSharp {
                      fluid(maxWidth: 800, maxHeight: 800) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                  others {
                    hide
                  }
                  date(formatString: "DD/MM/YYYY")
                }
              }
            }
          }
        }
      `}
      render={data => (
        <Wrapper>
          <h2>Últimos posts no blog</h2>
          <Roll data={data} />
        </Wrapper>
      )}
    />
  )
}

// BlogRoll.propTypes = {
//   data: PropTypes.shape({
//     allMarkdownRemark: PropTypes.shape({
//       edges: PropTypes.arrayOf(
//         PropTypes.shape({
//           node: PropTypes.shape({
//             frontmatter: PropTypes.shape({
//               title: PropTypes.string,
//             }),
//             fields: PropTypes.shape({
//               fullPath: PropTypes.string,
//             }),
//           }),
//         })
//       ),
//     }),
//   }).isRequired,
//   location: PropTypes.shape({
//     pathname: PropTypes.string,
//   }).isRequired,
// }

export default BlogRoll
