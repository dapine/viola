import styled from "styled-components";

export const StyledCardBase = styled.div`
  box-shadow: 0 4px 8px 0 ${props => props.theme.colors.gray};
  transition: 0.3s;
  padding: 0.8rem;
  border-radius: 12px;
  background-color: ${props => props.theme.colors.background};
  filter: brightness(105%);

  &:hover {
    box-shadow: 0 8px 26px 0 ${props => props.theme.colors.gray};
  }
`