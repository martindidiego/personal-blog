import React from "react"
import { Link } from "gatsby"

// Components.
import { Bio } from "../"

// Styles.
import { GlobalStyles, CodeStyles } from "../../utils/styles"
import { Heading, BioWrapper } from "./Layout.style"

export const Layout = props => {
  const { location, children } = props
  const rootPath = `${__PATH_PREFIX__}/`

  /**
   * Determine if user is in root path.
   */
  const atRoot = location.pathname === rootPath

  return (
    <>
      <GlobalStyles />
      <CodeStyles />
      <Heading help={true} flat={!atRoot}>
        <BioWrapper>
          <Bio atRoot={atRoot} />
          {!atRoot && <Link to={"/"}>&larr; All Posts</Link>}
        </BioWrapper>
        <main>{children}</main>
      </Heading>
    </>
  )
}
