import styled from "styled-components";

interface CircleProps {
  color: string,
  width?: string,
  height?: string
}

const StyledCircleBase = styled('div')<CircleProps>`
  display: inline-block;
  border-radius: 2em;
  background-color: ${props => props.color};
  width: ${props => props.width ? props.width : "1em"};
  height: ${props => props.height ? props.height : "1em"};
  border: 1px solid ${props => props.theme.colors.foreground}
`


export const Circle: React.FC<CircleProps> = (props) => {
  return <StyledCircleBase {...props}></StyledCircleBase>
}