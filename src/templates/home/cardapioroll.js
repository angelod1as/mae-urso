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

const CardapioRoll = () => {
  return (
    <StaticQuery
      query={graphql`
        query cardapioRoll {
          allMarkdownRemark(
            filter: { fields: { type: { eq: "cardapios" } } }
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
                }
              }
            }
          }
        }
      `}
      render={data => {
        console.log(data)
        return (
          <Wrapper>
            <h2>Últimos cardápios</h2>
            <Roll data={data} />
          </Wrapper>
        )
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
