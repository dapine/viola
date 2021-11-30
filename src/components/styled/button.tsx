import styled from "styled-components";

export const StyledButtonBase = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.foreground};
  border: none;
  border-radius: ${props => props.theme.button.shape};
  padding: 0.5em;
`