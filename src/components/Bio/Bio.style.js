import styled from "styled-components"

// Components.
import Image from "gatsby-image"

/**
 * Avatar.
 */
export const Avatar = styled(Image).attrs({
  fixed: props => props.fixed,
  alt: props => props.alt,
})`
  border-radius: 50%;
`
