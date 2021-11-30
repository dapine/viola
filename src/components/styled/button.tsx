import React from "react";
import styled from "styled-components";

interface StyledButtonBaseProps {
  link: boolean
}

export const StyledButtonBase = styled.button`
  background-color: ${props => props.color ? props.color : props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: ${props => props.theme.button.shape};
  padding: 0.5em;
  cursor: pointer;

  &:hover {
    box-shadow: inset 0 0 100px 100px rgba(0, 0, 0, 0.1);
  }
`

const StyledButtonBaseLink = styled(StyledButtonBase)`
  background-color: transparent;
  color: ${props => props.theme.colors.foreground};
`

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  color?: string
  link?: boolean
}

export const Button: React.FC<ButtonProps> = (props) => {
  return props.link ?
    <StyledButtonBaseLink {...props}>{props.children}</StyledButtonBaseLink>
    : <StyledButtonBase {...props}>{props.children}</StyledButtonBase>
}