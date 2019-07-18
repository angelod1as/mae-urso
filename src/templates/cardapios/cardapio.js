import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import parse from 'html-react-parser'
import styled from 'styled-components'
import uuid from 'uuid/v1'

import Container from '../../components/Container'
import WithIcon from './WithIcon'

const cardapio = props => {
  const { data, location } = props
  const { pathname } = location
  const { frontmatter, html } = data.markdownRemark
  const { longdesc = null, desc } = frontmatter.descGroup

  const Divider = ({ children }) => {
    const Div = styled.div`
      margin: 50px 0 20px 0;
      font-weight: bold;
      display: inline-flex;
      width: 100%;
      justify-content: center;
      position: relative;
      &:before {
        content: '';
        border-top: 1px solid black;
        margin: 0 auto;
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        z-index: -1;
      }
      h3 {
        font-size: 1.2em;
        display: block;
        background-color: white;
        padding: 0 10px;
      }
    `
    return (
      <Div>
        <h3>{children}</h3>
      </Div>
    )
  }

  const Title = styled.h1``
  const Lead = styled.p``
  const Html = styled.div``

  return (
    <Container title={frontmatter.title} here={pathname}>
      <figure>
        <img src={frontmatter.thumb} alt="" />
      </figure>
      <Title>{frontmatter.title}</Title>
      <Lead>{longdesc || desc}</Lead>
      <Divider>Detalhes</Divider>
      <Html>{parse(html)}</Html>
      {frontmatter.include.length > 0 ? (
        <div>
          <Divider>Incluso no serviço</Divider>
          {frontmatter.include.map(each => {
            return <WithIcon key={uuid()} item={each} />
          })}
        </div>
      ) : (
        ''
      )}
    </Container>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { fullPath: { eq: $path } }) {
      html
      frontmatter {
        date
        title
        thumb
        descGroup {
          longdesc
          desc
        }
        thumb
        include
      }
    }
  }
`

cardapio.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        thumb: PropTypes.string.isRequired,
        include: PropTypes.arrayOf(PropTypes.string),
        descGroup: PropTypes.shape({
          desc: PropTypes.string.isRequired,
          longdesc: PropTypes.string,
        }),
      }),
      html: PropTypes.string.isRequired,
    }),
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

cardapio.defaultProps = {
  data: {
    markdownRemark: {
      frontmatter: {
        descGroup: {
          longdesc: undefined,
        },
      },
    },
  },
}

export default cardapio
