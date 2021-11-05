import { useCallback, useContext, useState } from "react"
import { ActionType } from "../store/actionTypes"
import { StoreContext } from "../store/StoreContext"
import Crop from "../types/crop"
import Text from "../types/text"
import { formatMiliSeconds } from "../utils/utils"
import Draggable from "./Draggable"
import "./styles/SubtitleCard.css"
import update from 'immutability-helper'
interface SubtitleCardProps {
  id: number
  subKey: string
  crop: Crop
}

const SubtitleCard: React.FC<SubtitleCardProps> = props => {
  const { subKey, crop, id } = props

  const [isTextareaVisible, setTextareaVisible] = useState(false)

  const { dispatch } = useContext(StoreContext)

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = crop.texts[dragIndex]
      const newOrder: any = update(crop.texts, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      })

      dispatch({ type: ActionType.REPLACE_ALL_TEXTS_FROM_CROP, payload: { cropIndex: id, texts: newOrder } })
    },
    [crop.texts, dispatch, id],
  )

  return (
    <div key={subKey} className="card" style={{ margin: "1rem" }}>
      <div style={{ marginBottom: "0.4rem" }}><span className="badge">{subKey}</span></div>
      <div><span>{formatMiliSeconds(crop.start)}</span> ➡️ <span>{crop.end && formatMiliSeconds(crop.end)}</span></div>
      <div>
        {crop.texts.map((text, i) => {
          return <Draggable id={i} index={i} moveCard={moveCard} text={text.value} />
        })}
      </div>
      {isTextareaVisible &&
        <div>
          <textarea
            className="textarea"
            style={{ resize: "none" }}
            onBlur={(e) => {
              const t: Text = { index: crop.texts.length, value: e.target.value }
              crop.texts = [...crop.texts, t]
              dispatch({ type: ActionType.REPLACE_CROP, payload: { index: id, crop: crop } })

              setTextareaVisible(false)
            }} />
        </div>}
      <div><button onClick={() => setTextareaVisible(true)}>new</button></div>
    </div>
  )
}

export default SubtitleCard