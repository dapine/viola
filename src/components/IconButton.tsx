import { MouseEvent } from "react"
import { Button } from "./styled/button"

interface IconButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
  icon: string | React.ReactNode
  style?: object
  color?: string
  link?: boolean
}

const IconButton: React.FC<IconButtonProps> = (props) => {
  const { onClick, icon, style, color, link } = props

  return <Button onClick={onClick} style={style} color={color} link={link}>{icon}</Button>
}

export default IconButton
