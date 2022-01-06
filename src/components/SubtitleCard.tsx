import update from 'immutability-helper'
import { useCallback, useContext, useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { useTheme } from "styled-components"
import { ActionType } from "../store/action"
import { StoreContext } from "../store/StoreContext"
import Crop from "../types/crop"
import Text from "../types/text"
import { Variable, VariableType } from '../types/variable'
import { formatMiliSeconds } from "../utils/utils"
import ConfirmDialog from "./ConfirmDialog"
import Draggable from "./Draggable"
import Drop from "./Drop"
import Dropdown from './Dropdown'
import Editable from "./Editable"
import IconButton from "./IconButton"
import { Button } from './styled/button'
import { StyledCardBase } from './styled/card'
import { Circle } from './styled/circle'
import { Separator } from './styled/separator'
import { TextArea } from './styled/textarea'

interface SubtitleCardProps {
  id: number
  subKey: string
  crop: Crop
}

const SubtitleCard: React.FC<SubtitleCardProps> = props => {
  const { subKey, crop, id } = props

  const [isTextareaVisible, setTextareaVisible] = useState(false)
  const [isModalRemoveTextOpen, setModalRemoveTextOpen] = useState(false)
  const [isModalRemoveCropOpen, setModalRemoveCropOpen] = useState(false)
  const [textToDelete, setTextToDelete] = useState({} as Text)

  const { state, dispatch } = useContext(StoreContext)

  const theme = useTheme();

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = crop.texts[dragIndex]
      const newOrder: Array<Text> = update(crop.texts, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      })

      dispatch({ type: ActionType.REPLACE_ALL_TEXTS_FROM_CROP, payload: { cropIndex: id, texts: newOrder } })
    },
    [crop.texts, dispatch, id],
  )

  const border = crop.selected ? `3px solid ${theme.colors.secondary}` : "none"
  const cropStartMili = formatMiliSeconds(crop.start)
  const cropEndMili = crop.end && formatMiliSeconds(crop.end)

  const closeModal = () => {
    setTextToDelete({} as Text)
    setModalRemoveTextOpen(false)
    setModalRemoveCropOpen(false)
  }

  const assignVariable = (cropIndex: number, textIndex: number, variable: Variable) => {
    dispatch({
      type: ActionType.ADD_VARIABLE_TO_TEXT,
      payload: { cropIndex: cropIndex, textIndex: textIndex, variable: variable }
    })
  }

  const unassignVariable = (cropIndex: number, textIndex: number, variable: Variable) => {
    dispatch({
      type: ActionType.REMOVE_VARIABLE_FROM_TEXT, payload: { cropIndex: cropIndex, textIndex: textIndex, variable: variable }
    })
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <StyledCardBase key={subKey} style={{ margin: "1rem", border: border }}>
        <div style={{ marginBottom: "2em" }}>
          <Drop color={theme.colors.primary}>{subKey}</Drop>
          <IconButton
            style={{ float: "right" }}
            onClick={() => setModalRemoveCropOpen(true)}
            icon='❌'
            color={theme.colors.negative}
          />
        </div>
        <div><span>{cropStartMili}</span> ➡️ <span>{cropEndMili}</span></div>
        <div style={{ marginTop: "1em" }}>
          {crop.texts.map((text, i) => {
            return (
              <Draggable key={i} id={i} index={i} moveCard={moveCard}>
                <Editable
                  value={text.value}
                  onChange={(e) => {
                    dispatch({
                      type: ActionType.REPLACE_TEXT_FROM_CROP,
                      payload: { cropIndex: id, textIndex: i, textValue: e.target.value }
                    })
                  }}
                  actions={[
                    { func: () => { setModalRemoveTextOpen(true); setTextToDelete(text) }, icon: '❌' },
                    <Dropdown link text='Variables' >
                      <div>
                        <div><b><small>Select the variables:</small></b></div>
                        <div style={{ marginTop: "0.6em" }}>
                          {
                            state.variables.map((v) => {
                              switch (v.type) {
                                case VariableType.Color:
                                  return (
                                    <div>
                                      <input type="checkbox" onChange={(e) => {
                                        e.target.checked ? assignVariable(id, i, v) : unassignVariable(id, i, v)
                                      }} />
                                      Color: <Circle color={v.value} /> ({v.value})
                                      <Separator />
                                    </div>
                                  )
                                case VariableType.Position:
                                  return (
                                    <div>
                                      <input type="checkbox" onChange={(e) => {
                                        e.target.checked ? assignVariable(id, i, v) : unassignVariable(id, i, v)
                                      }} />
                                      Position: {v.value}
                                      <Separator />
                                    </div>
                                  )
                                case VariableType.TextFormatting:
                                  return (
                                    <div>
                                      <input type="checkbox" onChange={(e) => {
                                        e.target.checked ? assignVariable(id, i, v) : unassignVariable(id, i, v)
                                      }} />
                                      Formatting: {v.value}
                                      <Separator />
                                    </div>
                                  )
                                default: return null
                              }
                            })
                          }
                        </div>
                      </div>
                    </Dropdown>
                  ]}
                />
                <Separator />
              </Draggable>)
          })}
        </div>
        {isTextareaVisible &&
          <div>
            <TextArea
              autoFocus
              onBlur={(e) => {
                const t: Text = { index: crop.texts.length, value: e.target.value, variables: [] }
                crop.texts = [...crop.texts, t]
                dispatch({ type: ActionType.REPLACE_CROP, payload: { index: id, crop: crop } })

                setTextareaVisible(false)
              }} />
          </div>}
        <div style={{ marginTop: "1em" }}>
          <Button onClick={() => setTextareaVisible(true)}>New</Button>
        </div>
        <ConfirmDialog
          isOpen={isModalRemoveTextOpen}
          confirmAction={() => {
            dispatch({
              type: ActionType.REMOVE_TEXT_FROM_CROP,
              payload: { cropIndex: id, text: textToDelete }
            })
            closeModal()
          }}
          notConfirmAction={closeModal}
        >
          <h1>Are you sure?</h1>
          <p><b>This will delete the following caption:</b></p>
          <code>{textToDelete.value}</code>
          <Separator />
        </ConfirmDialog>
        <ConfirmDialog
          isOpen={isModalRemoveCropOpen}
          confirmAction={() => {
            dispatch({ type: ActionType.REMOVE_CROP, payload: { crop: crop } })

            closeModal()
          }}
          notConfirmAction={closeModal}
        >
          <h1>Are you sure?</h1>
          <p><b>This will delete this caption section</b></p>
          <Separator />
        </ConfirmDialog>
      </StyledCardBase>
    </DndProvider >
  )
}

export default SubtitleCard