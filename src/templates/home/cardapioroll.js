import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link, StaticQuery } from 'gatsby'
import uuid from 'uuid/v1'
import styled from 'styled-components'

import Roll from './roll'

const CardapioRoll = () => {
  return (
    <StaticQuery
      query={graphql`
        query CardapioRoll {
          allMarkdownRemark(filter: { fields: { type: { eq: "cardapio" } } }) {
            edges {
              node {
                html
                fields {
                  slug
                  type
                  fullPath
                }
              }
            }
          }
        }
      `}
      render={data => {
        console.log('oi')
      }}
    />
  )
}

// CardapioRoll.propTypes = {
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

export default CardapioRoll
