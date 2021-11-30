import { HTMLAttributes } from "react";
import styled from "styled-components";

interface StyledFlexBaseProps {
  direction?: string
}

const StyledFlexBase = styled('div') <StyledFlexBaseProps>`
  display: flex;
  flex-direction: ${props => props.direction ? props.direction : 'row'};
`

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  direction?: string
}

export const Flex: React.FC<FlexProps> = (props) => {
  return <StyledFlexBase {...props}>{props.children}</StyledFlexBase>
}