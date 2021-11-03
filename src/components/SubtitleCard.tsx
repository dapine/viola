import { useContext, useState } from "react"
import { ActionType } from "../store/actionTypes"
import { StoreContext } from "../store/StoreContext"
import Crop from "../types/crop"
import Text from "../types/text"
import "./styles/SubtitleCard.css"
interface SubtitleCardProps {
  id: number
  subKey: string
  crop: Crop
}

const SubtitleCard: React.FC<SubtitleCardProps> = props => {
  const { subKey, crop, id } = props

  const [isTextareaVisible, setTextareaVisible] = useState(false)

  const { dispatch } = useContext(StoreContext)

  return (
    <div key={subKey} className="card" style={{ margin: "1rem" }}>
      <div style={{ marginBottom: "0.4rem" }}><span className="badge">{subKey}</span></div>
      <div><span>{crop.start}</span> ➡️ <span>{crop.end}</span></div>
      <div>
        {crop.texts.map((text, i) => {
          return <p key={i}>{text.value}</p>
        })}
      </div>
      {isTextareaVisible &&
        <div>
          <textarea
            className="textarea"
            style={{ resize: "none" }}
            onBlur={(e) => {
              const t: Text = { order: crop.texts.length, value: e.target.value }
              crop.texts = [...crop.texts, t]
              dispatch({ type: ActionType.REPLACE_CROP, payload: {index: id, crop: crop} })

              setTextareaVisible(false)
            }} />
        </div>}
      <div><button onClick={() => setTextareaVisible(true)}>new</button></div>
    </div>
  )
}

export default SubtitleCard