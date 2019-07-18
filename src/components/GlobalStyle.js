import { createGlobalStyle } from 'styled-components'
import normalize from 'styled-normalize'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  /* reset and normalize */
  ${reset}
  ${normalize}

  body, html {
    height: 100%;
    position: relative;
    font-family: ${p => p.theme.font.text}, serif;
    font-size: 18px;
  }

  /* TYPE */

  h1, h2, h3, h4, h5, h6 {
    font-family: ${p => p.theme.font.display}, sans-serif !important;
    font-weight: 400;
    line-height: 1.3em;
  }

  h1 {
    font-weight: 700;
    margin-bottom: 30px;
    font-size: 2em;
  }

  h2 {
    margin: 50px 0 25px 0;
    font-size: 1.5em;
  }

  p, ul, ol, li {
    margin: 20px 0 20px 0;
    line-height: 1.3em;
  }

  ul {
    li {
      padding-left: 25px;
      position: relative;
      &:before {
        content: '-';
        top: 0;
        left: 5px;
        position: absolute;
      }
    }
  }

  ol {
    li {
      padding-left: 25px;
      position: relative;
      counter-increment: step-counter;
      &:before {
        content: counter(step-counter) '.';
        top: 0;
        left: 5px;
        position: absolute;
      }
    }
  }

  /* IMAGE */
  img {
    width: 100%;
    height: auto;
    margin: 15px 0;
  }

  figure {
    margin: 15px 0;
    & > img {
      margin: 0;
    }
  }
`
export default GlobalStyle
