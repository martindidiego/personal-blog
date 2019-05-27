import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet as ReactHelmet } from "react-helmet"

/**
 * Queries site metadata.
 */
const qSiteMetadata = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`

/**
 * Helmet for application.
 *
 * Contains <head /> elements.
 */
export const Helmet = ({ description, lang, meta, title }) => {
  const { site } = useStaticQuery(qSiteMetadata)
  const metaDescription = description || site.siteMetadata.description

  return (
    <ReactHelmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

Helmet.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

Helmet.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}
