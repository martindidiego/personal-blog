import React from "react"
import styled from "styled-components"
import { Link, graphql } from "gatsby"

// Components.
import { Layout, Helmet } from "../components"

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
 * Blog post title.
 */
const PostTitle = styled.h3`
  margin-bottom: 5px;
  font-weight: normal;
`

/**
 * Wrapper for post excerpt.
 */
const Excerpt = styled.div`
  margin-bottom: 40px;
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
