import { useRef } from "react"
import DropdownButton from "./DropdownButton"

interface DropdownProps {
  text: string | React.ReactNode
  link?: boolean
  children: React.ReactNode
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  const { text, link, children } = props

  const ref = useRef<HTMLDivElement>(null)

  return (
    <div ref={ref} style={{display: 'inline'}}>
      <DropdownButton parentRef={ref} text={text} link={link}>
        {children}
      </DropdownButton>
    </div>
  )
}

export default Dropdown
