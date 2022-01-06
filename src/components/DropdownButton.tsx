import usePortal from "react-cool-portal"
import { useTheme } from "styled-components"
import { Button } from "./styled/button"

interface DropdownButtonProps {
  children?: React.ReactNode
  text: string
  mouseOver?: boolean
  link?: boolean
  parentRef: React.RefObject<HTMLDivElement>
}

const DropdownButton: React.FC<DropdownButtonProps> = (props) => {
  const { children, text, mouseOver = false, link = false, parentRef } = props

  const { Portal, show } = usePortal({ /*containerId: id,*/ defaultShow: false, autoRemoveContainer: false })

  const theme = useTheme()

  const button = mouseOver ? <Button link={link} onMouseOver={show}>{text}</Button> : <Button link={link} onClick={show}>{text}</Button>

  const parentX = parentRef?.current?.getBoundingClientRect().x || 0 
  const parentY = parentRef?.current?.getBoundingClientRect().y || 0

  return (
    <>
      {button}
      <Portal>
        <div style={{
          position: 'absolute',
          backgroundColor: theme.colors.background,
          color: theme.colors.foreground,
          zIndex: 1,
          top: parentY + 32,
          left: parentX,
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