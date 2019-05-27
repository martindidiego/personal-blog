import React from "react"
import { Link, graphql } from "gatsby"

// Components.
import { Layout, Helmet } from "../components"

// Styles.
import { Excerpt, PostTitle } from "./home.style"
import { GlobalStyles } from "../utils/styles"

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

        {/* Posts */}
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <Excerpt key={node.fields.slug}>
              <PostTitle>
                <Link to={node.fields.slug}>{title}</Link>
              </PostTitle>
              <small>{node.frontmatter.date}</small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </Excerpt>
          )
        })}
      </Layout>
    </>
  )
}

export default BlogIndex
