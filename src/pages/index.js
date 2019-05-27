import React from "react"
import { Link, graphql } from "gatsby"

// Components.
import { Layout, Bio, Helmet } from "../components"

// Styles.
import { GlobalStyles } from "../utils/styles"

// Utils.
import { rhythm } from "../utils/typography"

/**
 * Query for site metadata and post excerpts.
 */
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`

/**
 * Blog entry point (root) component.
 */
const BlogIndex = props => {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <>
      <GlobalStyles />
      <Layout location={props.location} title={siteTitle}>
        <Helmet title="All posts" />
        <Bio />

        {/* Posts */}
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </div>
          )
        })}
      </Layout>
    </>
  )
}

export default BlogIndex
