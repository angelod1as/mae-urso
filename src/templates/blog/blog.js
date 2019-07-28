import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import uuid from 'uuid/v1'
import styled from 'styled-components'
import Img from 'gatsby-image'

import Container from '../../components/container'

const Wrapper = styled.div`
  margin: 20px 0;
  a {
    text-decoration: none;
    font-family: ${p => p.theme.font.text};
    &:hover {
      h2 {
        transition: color 0.2s;
        color: ${p => p.theme.color.darker};
      }
      p {
        transition: color 0.2s;
        color: ${p => p.theme.color.darker};
      }
    }
  }
`

const Title = styled.h2`
  margin: 20px 0 10px 0;
  line-height: 1em;
`

const DescDate = styled.p`
  margin: 0;
  color: ${p => p.theme.color.black};
  font-size: 0.9em;
  span {
    color: ${p => p.theme.color.darkgray};
    font-size: 0.8em;
  }
`

const Blog = props => {
  const { data, location } = props
  const { pathname } = location
  const { edges } = data.allMarkdownRemark
  return (
    <Container title="blog" here={pathname}>
      <h1>Blog</h1>
      {edges.map(post => {
        const { frontmatter, fields } = post.node
        const { title, date, descGroup, thumbnail } = frontmatter
        const { fluid } = thumbnail ? thumbnail.childImageSharp : null
        const { desc } = descGroup
        return (
          <Wrapper key={uuid()}>
            <Link to={fields.fullPath}>
              {thumbnail ? <Img fluid={fluid} /> : ''}
              <Title>{title}</Title>
              <DescDate>
                <span>{date}</span> {desc}
              </DescDate>
            </Link>
          </Wrapper>
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
  query {
    allMarkdownRemark(filter: { fields: { type: { eq: "blog" } } }) {
      edges {
        node {
          fields {
            fullPath
          }
          frontmatter {
            title
            date(formatString: "DD/MM/YYYY")
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 800, maxHeight: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
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
