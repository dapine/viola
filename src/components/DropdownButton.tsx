import usePortal from "react-cool-portal"
import { Button } from "./styled/button"
import { useTheme } from "styled-components"

interface DropdownButtonProps {
  id: string
  children?: React.ReactNode
  text: string
  mouseOver?: boolean
  link?: boolean
}

const DropdownButton: React.FC<DropdownButtonProps> = (props) => {
  const { children, text, mouseOver = false, id, link = false } = props

  const { Portal, show } = usePortal({ containerId: id, defaultShow: false, autoRemoveContainer: false })

  const theme = useTheme()

  const button = mouseOver ? <Button link={link} onMouseOver={show}>{text}</Button> : <Button link={link} onClick={show}>{text}</Button>

  return (
    <>
      {button}
      <div id={id}></div>
      <Portal>
        <div style={{
          position: 'absolute',
          backgroundColor: theme.colors.background,
          color: theme.colors.foreground,
          top: "90%",
          left: "0",
          padding: "1em",
          border: "1px solid rgba(0, 0, 0, 0.04)",
          boxShadow: "0 16px 24px 2px rgba(0, 0, 0, 0.14)",
          borderRadius: theme.button.shape
        }}>
          {children}
        </div>
      </Portal>
    </>)
}

export default DropdownButton