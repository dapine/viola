import update from 'immutability-helper'
import { useCallback, useContext, useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { useTheme } from "styled-components"
import { ActionType } from "../store/action"
import { StoreContext } from "../store/StoreContext"
import Crop from "../types/crop"
import Text from "../types/text"
import { formatMiliSeconds } from "../utils/utils"
import ConfirmDialog from "./ConfirmDialog"
import Draggable from "./Draggable"
import Drop from "./Drop"
import Editable from "./Editable"
import IconButton from "./IconButton"
import { Button } from './styled/button'
import { StyledCardBase } from './styled/card'
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

  const { dispatch } = useContext(StoreContext)

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
                  remove={() => {
                    setModalRemoveTextOpen(true)
                    setTextToDelete(text)
                  }} />
                  <Separator />
              </Draggable>)
          })}
        </div>
        {isTextareaVisible &&
          <div>
            <TextArea
              onBlur={(e) => {
                const t: Text = { index: crop.texts.length, value: e.target.value }
                crop.texts = [...crop.texts, t]
                dispatch({ type: ActionType.REPLACE_CROP, payload: { index: id, crop: crop } })

                setTextareaVisible(false)
              }} />
          </div>}
        <div style={{marginTop: "1em"}}><Button onClick={() => setTextareaVisible(true)}>New</Button></div>
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
          <hr />
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
          <hr />
        </ConfirmDialog>
      </StyledCardBase>
    </DndProvider >
  )
}

export default SubtitleCard