import styled from "styled-components";

const StyledHrBase = styled.hr`
  height: 1px;
  background-color: ${props => props.theme.colors.gray};
  border: none;
`

export const Separator: React.FC = () => {
  return <StyledHrBase />
}