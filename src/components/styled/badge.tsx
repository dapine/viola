import styled from "styled-components";

const StyledBadgeBase = styled.span`
  padding: 0.1em 0.2em;
  border-radius: 0.3em;
  background-color: ${props => props.color ? props.color : props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
`

interface BadgeProps {
  color?: string
  children?: any
}

export const Badge: React.FC<BadgeProps> = (props) => {
  return <StyledBadgeBase {...props}>{props.children}</StyledBadgeBase>
}