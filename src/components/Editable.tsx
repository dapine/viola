import React, { ChangeEvent, FocusEvent, useState } from "react"
import IconButton from "./IconButton"
import { Flex } from "./styled/flex"
import { TextArea } from "./styled/textarea"

interface EditableActionParams {
  icon: string | React.ReactNode
  func: () => any
}

interface EditableProps {
  value: string
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void
  editIcon?: string | React.ReactNode
  actions?: Array<EditableActionParams | React.ReactNode>
}

function isActionParam(ac: EditableActionParams | React.ReactNode): ac is EditableActionParams {
  return (ac as EditableActionParams).func !== undefined
}

const Editable: React.FC<EditableProps> = (props) => {
  const { value, onChange, onBlur = () => { }, editIcon = '✏️️', actions } = props

  const [isEditing, setEditing] = useState(false)

  const textUI = (
    <>
      <Flex>
        <div style={{ width: "86%" }}>{value}</div>
        <div>
          {
            actions?.map((ac) => {
              return isActionParam(ac) ? <IconButton link onClick={ac.func} icon={ac.icon} /> : ac
            })
          }
          <IconButton link onClick={() => { setEditing(true) }} icon={editIcon} />
        </div>
      </Flex>
      <div>

      </div>
    </>
  )

  const editUI = (
    <TextArea
      autoFocus
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