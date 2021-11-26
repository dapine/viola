import { MouseEvent } from "react"

interface IconButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
  icon: any
  style: object
}

const IconButton: React.FC<IconButtonProps> = (props) => {
  const { onClick, icon, style } = props

  return <button onClick={onClick} style={style}>{icon}</button>
}

export default IconButton