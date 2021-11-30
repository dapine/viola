import { MouseEvent } from "react"
import { StyledButtonBase } from "./styled/button"

interface IconButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
  icon: any
  style: object
  color?: string
}

const IconButton: React.FC<IconButtonProps> = (props) => {
  const { onClick, icon, style, color } = props

  return <StyledButtonBase onClick={onClick} style={style} color={color}>{icon}</StyledButtonBase>
}

export default IconButton