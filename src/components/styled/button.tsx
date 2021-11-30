import styled from "styled-components";

export const StyledButtonBase = styled.button`
  background-color: ${props => props.color ? props.color : props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: ${props => props.theme.button.shape};
  padding: 0.5em;

  &:hover {
    box-shadow: inset 0 0 100px 100px rgba(0, 0, 0, 0.1);
  }
`