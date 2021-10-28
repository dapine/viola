import { Dispatch, SetStateAction } from "react"
import "./styles/Textarea.css"

interface TextareaProps {
  value?: string
  setValue: Dispatch<SetStateAction<string>>
}

const Textarea: React.FC<TextareaProps> = props => {

  return <textarea
    value={props.value}
    onChange={(e) => props.setValue(e.target.value)}
    className="textarea"
    style={{ resize: "none" }} />
}

export default Textarea