import styled from "styled-components"

// Components.
import Image from "gatsby-image"

// Utils.
import { colors, centerChildrenHorizontally } from "../../utils/styles"

/**
 * Component wrapper.
 */
export const Wrapper = styled.div`
  padding-right: 50px;
  border-right: 1px solid #d4d4d4;
  margin-right: 50px;
  padding-bottom: 100px;
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
  font-size: 18px;
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
