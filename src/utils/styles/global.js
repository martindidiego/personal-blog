import { createGlobalStyle } from "styled-components"

// Utils.
import { colors } from "./"

/**
 * Global application styles.
 */
const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  body, html {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
    padding: 25px;
    padding-top: 30px;
    font-family: Source Sans Pro, -apple-system, Helvetica, Avenir Next,
      sans-serif;
    color: #383838;
    background-color: #fbfbfb;
    max-width: 900px;
    margin: 0 auto;
  }

  main {
    padding-bottom: 80px;
  }

  @media (min-width: 768px) {
    body {
      padding-top: 105px;
    }
  }

  h1 {
    font-weight: 100;
  }

  p {
    color: ${colors.text.secondary};
  }

  a {
    color: ${colors.text.link};
    text-decoration: none;
  }

  ul {
    list-style-type: none;
    padding-left: 0;
  }

  ul li {
    margin-bottom: 10px;
  }
`

export default GlobalStyles
