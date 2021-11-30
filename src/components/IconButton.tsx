import { MouseEvent } from "react"
import { StyledButtonBase } from "./styled/button"

interface IconButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
  icon: any
  style: object
}

const IconButton: React.FC<IconButtonProps> = (props) => {
  const { onClick, icon, style } = props

  return <StyledButtonBase onClick={onClick} style={style}>{icon}</StyledButtonBase>
}

export default IconButton