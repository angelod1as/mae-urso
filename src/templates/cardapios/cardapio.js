import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import parse from 'html-react-parser'
import styled from 'styled-components'
import uuid from 'uuid/v1'

import Container from '../../components/Container'
import WithIcon from './WithIcon'
import Call from '../../components/Call'

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
      border-top: 3px dotted ${p => p.theme.color.gray};
      margin: 0 auto;
      position: absolute;
      top: 42%;
      left: 0;
      width: 100%;
      z-index: 1;
    }
    h2 {
      font-size: 1.2em;
      display: block;
      background-color: ${p => p.theme.color.white};
      padding: 0 10px;
      margin: 0;
      z-index: 2;
    }
  `
  return (
    <Div>
      <h2>{children}</h2>
    </Div>
  )
}

Divider.propTypes = {
  children: PropTypes.string.isRequired,
}

const Cardapio = props => {
  const { data, location } = props
  const { pathname } = location
  const { frontmatter, html } = data.markdownRemark
  const { longdesc = null, desc } = frontmatter.descGroup

  const Title = styled.h1``
  const Lead = styled.p``
  const Html = styled.div``
  const Thumb = styled.figure`
    margin-top: 0;
  `

  return (
    <Container title={frontmatter.title} here={pathname}>
      <Thumb>
        <img src={frontmatter.thumb} alt="" />
      </Thumb>
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
      <Call>Contratar</Call>
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

Cardapio.propTypes = {
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

Cardapio.defaultProps = {
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

export default Cardapio
