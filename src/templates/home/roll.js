import React from 'react'
import PropTypes from 'prop-types'
// import { graphql, Link, StaticQuery } from 'gatsby'
import uuid from 'uuid/v1'
import styled from 'styled-components'
// import Img from 'gatsby-image'

import size from '../../components/breakpoints'

const Mosaic = styled.div`
  @media ${size.small} {
    display: flex;
    justify-content: space-around;
  }
`

const Tile = styled.div``

const Roll = ({ data }) => {
  const { edges } = data.allMarkdownRemark
  return (
    <Mosaic>
      {edges.map(({ node }) => {
        const { frontmatter, fields } = node
        const { fullPath } = fields
        const { title, date } = frontmatter
        let { thumb } = frontmatter
        if (thumb.includes('../../static/assets')) {
          thumb = thumb.replace('../../static', '')
        }
        return (
          <Tile key={uuid()}>
            <a href={fullPath}>
              {thumb ? <img src={thumb} alt="" /> : ''}
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
