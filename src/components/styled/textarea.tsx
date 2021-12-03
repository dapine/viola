import styled from "styled-components";

const StyledTextAreaBase = styled.textarea`
  resize: none;
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.foreground};
`

interface TextAreaProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  value?: any
  autoFocus?: boolean
}

export const TextArea: React.FC<TextAreaProps> = (props) => {
  return <StyledTextAreaBase {...props} />
}