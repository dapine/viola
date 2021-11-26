import { useCallback, useContext, useState } from "react"
import { ActionType } from "../store/action"
import { StoreContext } from "../store/StoreContext"
import Crop from "../types/crop"
import Text from "../types/text"
import { formatMiliSeconds } from "../utils/utils"
import Draggable from "./Draggable"
import "./styles/SubtitleCard.css"
import update from 'immutability-helper'
import Editable from "./Editable"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import ConfirmDialog from "./ConfirmDialog"
import { confirmDialog } from "../types/modalStyle"
interface SubtitleCardProps {
  id: number
  subKey: string
  crop: Crop
}

const SubtitleCard: React.FC<SubtitleCardProps> = props => {
  const { subKey, crop, id } = props

  const [isTextareaVisible, setTextareaVisible] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const [textToDelete, setTextToDelete] = useState({} as Text)

  const { dispatch } = useContext(StoreContext)

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

  const border = crop.selected ? "3px solid #B85C57" : "none"

  const closeModal = () => {
    setTextToDelete({} as Text)
    setModalOpen(false)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div key={subKey} className="card" style={{ margin: "1rem", border: border }}>
        <div style={{ marginBottom: "0.4rem" }}><span className="drop primary">{subKey}</span></div>
        <div><span>{formatMiliSeconds(crop.start)}</span> ➡️ <span>{crop.end && formatMiliSeconds(crop.end)}</span></div>
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
                    setModalOpen(true)
                    setTextToDelete(text)
                  }} />
                <hr />
              </Draggable>)
          })}
        </div>
        {isTextareaVisible &&
          <div>
            <textarea
              style={{ resize: "none" }}
              onBlur={(e) => {
                const t: Text = { index: crop.texts.length, value: e.target.value }
                crop.texts = [...crop.texts, t]
                dispatch({ type: ActionType.REPLACE_CROP, payload: { index: id, crop: crop } })

                setTextareaVisible(false)
              }} />
          </div>}
        <div><button onClick={() => setTextareaVisible(true)}>New</button></div>
        <ConfirmDialog
          isOpen={isModalOpen}
          style={confirmDialog}
          confirmAction={() => {
            dispatch({
              type: ActionType.REMOVE_TEXT_FROM_CROP,
              payload: { cropIndex: id, text: textToDelete }
            })

            closeModal()
          }}
          notConfirmAction={() => closeModal()}
        >
          <h1>Are you sure?</h1>
          <p><b>This will delete the following caption:</b></p>
          <code>{textToDelete.value}</code>
          <hr />
        </ConfirmDialog>
      </div>
    </DndProvider >
  )
}

export default SubtitleCard