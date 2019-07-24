import React from 'react'
// import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
// import uuid from 'uuid/v1'
// import styled from 'styled-components'

import Roll from './roll'

const BlogRoll = () => {
  return (
    <StaticQuery
      query={graphql`
        query BlogRoll {
          allMarkdownRemark(
            filter: { fields: { type: { eq: "blog" } } }
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
                  thumb
                  date(formatString: "DD/MM/YYYY")
                }
              }
            }
          }
        }
      `}
      render={data => <Roll data={data} />}
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
