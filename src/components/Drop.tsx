import styled from "styled-components"

interface DropProps {
  children: string
  style?: any
}

const BaseStyledDrop = styled.span`
  color: ${props => props.theme.colors.foreground};
  background-color: ${props => props.theme.colors.primary};
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  border-radius: 9rem;
`

const Drop: React.FC<DropProps> = (props) => {
  const { children, style } = props
  return <BaseStyledDrop style={style}>{children}</BaseStyledDrop>
}

export default Drop