import React from "react"
import { Link } from "gatsby"

// Components.
import { Bio } from "../"

// Styles.
import { Heading } from "./Layout.style"

export const Layout = props => {
  const { location, title, children } = props
  const rootPath = `${__PATH_PREFIX__}/`

  /**
   * Only show header on non-root pages.
   */
  const header =
    location.pathname === rootPath ? null : (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )

  return (
    <Heading>
      <div>
        <header>{header}</header>
        <Bio />
      </div>
      <main>{children}</main>
    </Heading>
  )
}
