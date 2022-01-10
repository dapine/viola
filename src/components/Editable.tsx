import { PencilIcon } from "@primer/octicons-react"
import React, { ChangeEvent, FocusEvent, useState } from "react"
import { useTheme } from "styled-components"
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
  const { value, onChange, onBlur = () => { }, editIcon = <PencilIcon />, actions } = props

  const theme = useTheme()

  const [isEditing, setEditing] = useState(false)
  const [style, setStyle] = useState<React.CSSProperties>({ borderRadius: theme.button.shape, padding: '4px 8px' })

  const dim = () => {
    setStyle({ ...style, boxShadow: 'inset 0 0 100px 100px rgba(0, 0, 0, 0.1)' })
  }

  const lighten = () => {
    const { boxShadow, ...styleWOShadow } = style
    setStyle(styleWOShadow)
  }

  const textUI = (
    <>
      <Flex>
        <div style={{ width: "80%", overflowWrap: "break-word" }}>{value}</div>
        <div>
          <IconButton link onClick={() => { setEditing(true) }} icon={editIcon} />
          {
            actions?.map((ac) => {
              return isActionParam(ac) ? <IconButton link onClick={ac.func} icon={ac.icon} /> : ac
            })
          }
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
    <div style={style} onMouseEnter={dim} onMouseLeave={lighten}>
      {isEditing ? editUI : textUI}
    </div>
  )
}

export default Editable
