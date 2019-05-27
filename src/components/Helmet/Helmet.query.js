import { graphql } from "gatsby"

/**
 * Queries site metadata.
 */
export const qSiteMetadata = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
