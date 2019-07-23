import { createGlobalStyle } from 'styled-components'
import normalize from 'styled-normalize'
import reset from 'styled-reset'
// import size from './breakpoints'

const GlobalStyle = createGlobalStyle`
  /* reset and normalize */
  ${reset}
  ${normalize}

  * {
    box-sizing: border-box !important;
  }

  /*
  * Purpose:
  * Assign height: "100%" to
  * html, body, #___gatsby &
  * div with role="group"
  */

  /* See CONTAINER > SITE flex-grow: 1 */
  /* https://dev.to/hzburki/100-height-to-all-divs-gatsby-33nd */

  html, body, #___gatsby {
      height: 100%;
  }

  body {
      margin: 0px;
  }

  div[role="group"][tabindex] {
      height: 100%;
  }

  /* CSS */

  body, html {
    height: 100%;
    min-height: 100%;
    position: relative;
    font-family: ${p => p.theme.font.text}, serif;
    font-size: 18px;
    background-color: ${p => p.theme.color.white};
  }

  /* TYPE */

  h1, h2, h3, h4, h5, h6 {
    font-family: ${p => p.theme.font.display}, sans-serif !important;
    font-weight: 400;
    line-height: 1.3em;
    color: ${p => p.theme.color.color};
  }

  p, h1, h2, h3, h4, h5, a {
      padding-left: 5px;
      padding-right: 5px;
    }

  p > a,
  span > a {
    padding-left: 0;
    padding-right: 0;
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

  h3, h4, h5 {
    margin: 50px 0 25px 0;
  }

  p, ul, ol, li {
    margin: 20px 0 20px 0;
    line-height: 1.3em;
  }

/* LISTS */

  ul, ol {
    li {
      padding-left: 25px;
      position: relative;
      &:before {
        top: 0;
        left: 5px;
        position: absolute;
        color: ${p => p.theme.color.darkgray};
      }
    }
  }

  ul {
    li {
      &:before {
        content: '\\203A';
      }
    }
  }

  ol {
    li {
      counter-increment: step-counter;
      &:before {
        content: counter(step-counter) '.';
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

  /* LINKS */

  a {
    color: ${p => p.theme.color.color};
    font-family: ${p => p.theme.font.display};
    font-size: 1.1em;
    transition: color 0.2s;
    &:hover {
      color: ${p => p.theme.color.darkgray};
    }
  }

`
export default GlobalStyle
