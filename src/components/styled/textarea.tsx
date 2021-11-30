import styled from "styled-components";

const StyledTextAreaBase = styled.textarea`
  resize: none;
  box-sizing: border-box;
  width: 100%;
  height: 80px;
`

interface TextAreaProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  value?: any
}

export const TextArea: React.FC<TextAreaProps> = (props) => {
  return <StyledTextAreaBase {...props} />
}