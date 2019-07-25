import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import parse from 'html-react-parser'
import { graphql, StaticQuery } from 'gatsby'

import BackgroundImage from 'gatsby-background-image'
import size from '../../components/breakpoints'

const fetchBg = background => {
  const BackgroundSection = ({ children, className }) => {
    return (
      <StaticQuery
        query={graphql`
          query BgQuery {
            allMarkdownRemark {
              edges {
                node {
                  frontmatter {
                    background {
                      relativePath
                      childImageSharp {
                        fluid(quality: 90, maxWidth: 4160) {
                          ...GatsbyImageSharpFluid_withWebp
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
          const filtered = data.allMarkdownRemark.edges.filter(
            each => each.node.frontmatter.background
          )
          const chosen = filtered.filter(
            each => each.node.frontmatter.background.relativePath === background.relativePath
          )
          const imageData = chosen[0].node.frontmatter.background.childImageSharp.fluid
          return (
            <BackgroundImage
              Tag="section"
              fluid={imageData}
              className={className}
              style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              {children}
            </BackgroundImage>
          )
        }}
      />
    )
  }

  BackgroundSection.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string.isRequired,
  }

  return BackgroundSection
}

// Abertura
const Opening = ({ html, background }) => {
  const BackgroundSection = fetchBg(background)

  const Open = styled(BackgroundSection)`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    background-attachment: fixed;

    text-align: center;
    color: ${p => p.theme.color.white};

    div {
      margin-bottom: 20px;
    }

    p,
    h1 {
      margin: 0;
      font-family: ${p => p.theme.font.display};
    }

    h1 {
      font-size: 3em;
      color: ${p => p.theme.color.white};
      @media ${size.small} {
        font-size: 5em;
      }
    }

    p {
      font-size: 1.3em;
    }
  `

  return (
    <Open>
      <div>{parse(html)}</div>
    </Open>
  )
}

Opening.propTypes = {
  html: PropTypes.string.isRequired,
  background: PropTypes.shape({
    childImageSharp: PropTypes.shape({}),
  }).isRequired,
}

export default Opening
