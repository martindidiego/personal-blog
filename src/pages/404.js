import React from "react"
import { graphql } from "gatsby"

// Components.
import { Layout, Helmet } from "../components"

/**
 * Query for site metadata.
 */
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const NotFoundPage = props => {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={props.location} title={siteTitle}>
      <Helmet title="404: Not Found" />
      <h1>404: Words Not Found</h1>
      <p>
        Not entirely sure how you ended up here, but you're either lost or the
        content you're after is gone.
      </p>
    </Layout>
  )
}

export default NotFoundPage
