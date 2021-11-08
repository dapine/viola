import { ChangeEvent, FocusEvent, useState } from "react"

interface EditableProps {
  value: string
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void
  editIcon?: any
}

const Editable: React.FC<EditableProps> = (props) => {
  const { value, onChange = () => { }, onBlur = () => { }, editIcon = '✏️️' } = props

  const [isEditing, setEditing] = useState(false)

  const textUI =
    <div>
      <span>{value}</span>
      <span style={{ cursor: "pointer" }} onClick={() => { setEditing(true) }}>{editIcon}</span>
    </div>

  const editUI =
    <textarea
      value={value}
      onBlur={(e) => { setEditing(false); onBlur(e) }}
      onChange={(e) => { onChange(e) }} />

  return (
    <>
      {isEditing ? editUI : textUI}
    </>
  )
}

export default Editable