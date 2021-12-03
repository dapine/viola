import { ToastContainer } from "react-toastify";
import styled from "styled-components";

export const StyledToastContainer = styled(ToastContainer).attrs({
  toastClassName: 'toast',
})`
  .toast {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.foreground};
  }

  button[aria-label="close"] {
    color: ${props => props.theme.colors.foreground};
  }
`