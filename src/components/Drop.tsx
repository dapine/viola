import styled from "styled-components"

interface DropProps {
  children: string
}

const BaseStyledDrop = styled.span`
  color: ${props => props.theme.colors.foreground};
  background-color: ${props => props.theme.colors.primary};
  float: "left";
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  border-radius: 9rem;
`

// className="drop primary" style={{ float: "left" }}
const Drop: React.FC<DropProps> = (props) => {
  const { children } = props
  return <BaseStyledDrop>{children}</BaseStyledDrop>
}

export default Drop