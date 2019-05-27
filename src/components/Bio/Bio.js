import React from "react"
import { StaticQuery, graphql } from "gatsby"

// Styles.
import { Wrapper, Avatar, Name, About, Profile } from "./Bio.style"

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
          <Wrapper>
            <Profile>
              <Avatar fixed={data.avatar.childImageSharp.fixed} alt={author} />
              <div>
                <Name>Martin Di Diego</Name>
                <About>Code + Design</About>
              </div>
            </Profile>
            <p>
              Hey, I'm Martin 👋🏻. I’m a software engineer living in Miami, FL.
            </p>

            <p>
              Check out{" "}
              <a href="https://martindidiego.com/" title="My website">
                my site
              </a>
              .
            </p>
          </Wrapper>
        )
      }}
    />
  )
}
