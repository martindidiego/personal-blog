import styled from "styled-components"

// Components.
import Image from "gatsby-image"

// Utils.
import { colors, centerChildrenHorizontally } from "../../utils/styles"

/**
 * Component wrapper.
 */
export const Wrapper = styled.div`
  margin-right: 50px;
  min-width: 250px;
`

/**
 * Avatar.
 */
export const Avatar = styled(Image).attrs(props => ({
  fixed: props => props.fixed,
  alt: props => props.alt,
}))`
  border-radius: 50%;
  margin-right: 10px;
`

/**
 * Component which hold's my name. Feels weird to write that in a comment.
 */
export const Name = styled.h1`
  font-weight: normal;
  font-size: 20px;
  margin: 0;
`
export const About = styled.span`
  font-size: 13px;
  color: ${colors.text.secondary};
`

/**
 * Wrapper for Avatar, Name, and About.
 */
export const Profile = styled.div`
  ${centerChildrenHorizontally};
  margin-bottom: 20px;
`
