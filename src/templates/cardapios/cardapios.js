import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import uuid from 'uuid/v1'
import styled from 'styled-components'

import Container from '../../components/Container'

const Tile = styled.div`
  margin: 20px 0 70px 0;
  a {
    text-decoration: none;
    display: block;
    font-family: ${p => p.theme.font.text};
  }
  figure {
    margin: 0;
  }
  div {
    margin: 10px 0;
    h2 {
      margin: 0;
    }
    p {
      margin: 5px 0;
      color: ${p => p.theme.color.black};
      font-size: 0.9em;
    }
  }

  &:hover {
    figure {
      img {
        transform: scale(0.99);
      }
    }
    h2,
    p {
      color: ${p => p.theme.color.darkgray};
    }
  }
`

const Cardapios = props => {
  const { data, location } = props
  const { pathname } = location
  const { edges } = data.allMarkdownRemark
  return (
    <Container title="Cardápios" here={pathname}>
      <h1>Cardápios</h1>
      {edges.map(each => {
        const { frontmatter, fields } = each.node
        const { title, thumb, descGroup } = frontmatter
        const { longdesc, desc } = descGroup
        return (
          <Tile key={uuid()}>
            <Link to={fields.fullPath}>
              <figure>
                <img src={thumb} alt="" />
              </figure>
              <div>
                <h2>{title}</h2>
                <p>{longdesc || desc}</p>
              </div>
            </Link>
          </Tile>
        )
      })}
    </Container>
  )
}

Cardapios.propTypes = {
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
    allMarkdownRemark(filter: { fields: { type: { eq: "cardapios" } } }) {
      edges {
        node {
          html
          fields {
            slug
            type
            fullPath
          }
          frontmatter {
            title
            thumb
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

export default Cardapios
