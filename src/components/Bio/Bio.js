import React from "react"
import { StaticQuery } from "gatsby"

// Queries.
import { qBiography } from "./Bio.query.js"

// Styles.
import { Avatar } from "./Bio.style"

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
