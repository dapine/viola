import React, { ChangeEvent, ChangeEventHandler, FocusEvent, FormEventHandler, useState } from "react"
import IconButton from "./IconButton"
import { Flex } from "./styled/flex"
import { TextArea } from "./styled/textarea"

interface EditableProps {
  value: string
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void
  remove: () => void
  editIcon?: string | React.ReactNode
  removeIcon?: string | React.ReactNode
}

const Editable: React.FC<EditableProps> = (props) => {
  const { value, onChange, onBlur = () => { }, remove, editIcon = '✏️️', removeIcon = '❌' } = props

  const [isEditing, setEditing] = useState(false)

  const textUI = (
    <>
      <Flex>
        <div style={{width: "86%"}}>{value}</div>
        <div>
          <IconButton link onClick={() => { setEditing(true) }} icon={editIcon} />
          <IconButton link onClick={() => { remove() }} icon={removeIcon} />
        </div>
      </Flex>
      <div>

      </div>
    </>
  )

  const editUI = (
    <TextArea
      value={value}
      onBlur={(e) => { setEditing(false); onBlur(e) }}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => { onChange(e) }} />
  )

  return (
    <>
      {isEditing ? editUI : textUI}
    </>
  )
}

export default Editable