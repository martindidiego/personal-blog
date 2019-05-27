/**
 * Global media queries.
 */

const sizes = {
  small: 767,
  medium: 1024,
}

const screenQueries = {
  small: `screen and (max-width: ${sizes.small}px)`,
  medium: `screen and (min-width: ${sizes.medium + 1}px)`,
  large: `screen and (min-width: ${sizes.medium + 1}px)`,
}

export default { screenQueries }
