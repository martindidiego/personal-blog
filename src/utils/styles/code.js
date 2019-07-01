import { createGlobalStyle } from "styled-components"

// Utils.
import { media } from "./"

const colors = {
  inline: {
    color: "#254ebf",
    backgroundColor: "rgba(127, 144, 191, 0.1)",
  },
  block: {
    backgroundColor: "#282a36",
  },
  token: {
    function: {
      color: "#ffc9a0",
    },
  },
  highlight: {
    borderColor: "#ffc9a0",
  },
}

/**
 * Global styles for code blocks.
 */
const CodeStyles = createGlobalStyle`
  /* Inline code */
  :not(pre) > code[class*='language-'] {
    border-radius: 0.3em;
    color: ${colors.inline.color};
    background: ${colors.inline.backgroundColor};
    padding: 0.15em 0.2em 0.05em;
    white-space: normal;
  }

  /* Code blocks */
  .gatsby-highlight {
    background-color: ${colors.backgroundColor};
    margin-bottom: 1.85rem;
    border-radius: 10px;
    @media ${media.screenQueries.small} {
      border-radius: 0px;
      margin: 1.85rem -25px;
    }
  }
  .gatsby-highlight pre[class*="language-"] {
    padding: 20px;
  }
  pre[class*='language'] code[class*='language'] {
    font-size: 14px;
  }

  /* Tokens */
  .token.plain-text {
    font-style: normal;
  }
  .token.function {
    color: ${colors.token.function.color}
  }

  /* Line highlight */
  .gatsby-highlight-code-line {
    border-width: 5px;
    border-color: ${colors.highlight.borderColor};
    margin: 0 -20px;
    padding: 0 12px;
  }
`

export default CodeStyles
