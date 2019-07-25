import React from 'react'
import PropTypes from 'prop-types'
// import { graphql, Link, StaticQuery } from 'gatsby'
import uuid from 'uuid/v1'
import styled from 'styled-components'
import Img from 'gatsby-image'

import size from '../../components/breakpoints'

const Mosaic = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  @media ${size.small} {
    justify-content: space-around;
    flex-direction: row;
  }

  h1 {
    font-weight: 300;
  }

  div,
  h1 {
    transition: all 0.1s;
  }

  a {
    text-decoration: none;
    &:hover {
      div {
        transform: scale(0.97);
      }
      h1 {
        color: ${p => p.theme.color.darkgray};
      }
    }
  }
`

const Tile = styled.div`
  @media ${size.small} {
    width: 20%;
    position: relative;
  }
  h1 {
    font-size: 1.2em;
    margin: 10px 0 0 0;
  }
  p {
    margin: 10px 0 0 0;
    font-size: 0.9em;
    color: ${p => p.theme.color.darkgray};
  }
`

const Roll = ({ data }) => {
  const { edges } = data.allMarkdownRemark
  return (
    <Mosaic>
      {edges.map(({ node }) => {
        const { frontmatter, fields } = node
        const { fullPath } = fields
        const {
          title,
          date,
          thumbnail: {
            childImageSharp: { fluid },
          },
        } = frontmatter
        return (
          <Tile key={uuid()}>
            <a href={fullPath}>
              <Img fluid={fluid} />
              <h1>{title}</h1>
              {date ? <p>{date}</p> : ''}
            </a>
          </Tile>
        )
      })}
    </Mosaic>
  )
}

Roll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape()),
    }),
  }).isRequired,
}

export default Roll
