import React from "react"
import styled from "styled-components"
import { Link, graphql } from "gatsby"

// Components.
import { Layout, Bio, Helmet } from "../components/"

/**
 * Query for site metadata and post data.
 */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`

/**
 * Post title.
 */
const PostTitle = styled.h1`
  font-weight: normal;
  margin-bottom: 10px;
`

/**
 * Post date.
 */
const PostDate = styled.small`
  margin-bottom: 15px;
  display: block;
`

/**
 * Post content.
 */
const PostContent = styled.div`
  margin: 15px 0px;
  padding: 15px 0px;
  border-top: 1px solid rgba(187, 187, 187, 0.58);
  border-bottom: 1px solid rgba(187, 187, 187, 0.58);
`

/**
 * Pagination list.
 */
const PaginationList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0;
`

/**
 * Template component for blog post.
 */
export const BlogPostTemplate = props => {
  const post = props.data.markdownRemark
  const siteTitle = props.data.site.siteMetadata.title
  const { previous, next } = props.pageContext

  return (
    <Layout location={props.location} title={siteTitle}>
      <Helmet
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <PostTitle>{post.frontmatter.title}</PostTitle>
      <PostDate>{post.frontmatter.date}</PostDate>
      <PostContent dangerouslySetInnerHTML={{ __html: post.html }} />

      {/* Pagination */}
      <PaginationList>
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </PaginationList>
    </Layout>
  )
}

export default BlogPostTemplate
