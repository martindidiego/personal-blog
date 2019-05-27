import React from "react"
import { Link } from "gatsby"

// Components.
import { Bio } from "../"

// Styles.
import { GlobalStyles } from "../../utils/styles"
import { Heading } from "./Layout.style"

export const Layout = props => {
  const { location, title, children } = props
  const rootPath = `${__PATH_PREFIX__}/`

  /**
   * Only show home link on non-root pages.
   */
  const showHomeLink = location.pathname !== rootPath

  return (
    <>
      <GlobalStyles />
      <Heading>
        <div>
          <Bio />
          {showHomeLink && <Link to={"/"}>&larr; Home</Link>}
        </div>
        <main>{children}</main>
      </Heading>
    </>
  )
}
