import styled from "styled-components"

// Utils.
import { media } from "../../utils/styles"

/**
 * Heading wrapper.
 */
export const Heading = styled.div`
  @media ${media.screenQueries.medium} {
    display: ${props => !props.flat && "flex"};
  }
`
/**
 * Bio wrapper.
 */
export const BioWrapper = styled.div`
  margin-bottom: 50px;
`
