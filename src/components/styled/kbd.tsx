import styled from "styled-components";

export const Kbd = styled.kbd`
  border-radius: 0.2em;
  padding: 1px 2px 0;
  border: 1px solid black;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.foreground};
`