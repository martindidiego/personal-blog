import React from "react"
import { StaticQuery, graphql } from "gatsby"

// Styles.
import { Avatar } from "./Bio.style"

/**
 * Query for biography content.
 */
export const qBiography = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

/**
 * Biography component.
 *
 * Includes avatar, name, and social links.
 */
export const Bio = () => {
  return (
    <StaticQuery
      query={qBiography}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <>
            <Avatar fixed={data.avatar.childImageSharp.fixed} alt={author} />
            <p>
              Written by <strong>{author}</strong> who lives and works in San
              Francisco building useful things.
              {` `}
              <a href={`https://twitter.com/${social.twitter}`}>
                You should follow him on Twitter
              </a>
            </p>
          </>
        )
      }}
    />
  )
}
