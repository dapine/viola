import styled from "styled-components"

interface DropProps {
  children?: string
  style?: any
  color?: string
}

const BaseStyledDrop = styled.span`
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.color ? props.color : props.theme.colors.primary};
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  border-radius: 9rem;
`

const Drop: React.FC<DropProps> = (props) => {
  const { children, style, color } = props
  return <BaseStyledDrop style={style} color={color}>{children}</BaseStyledDrop>
}

export default Drop