import Modal from "react-modal"
import { useTheme } from "styled-components"
import { withConfirmDialogStyle } from "../hocs/withModalStyle"
import { Button } from "./styled/button"
import { Flex } from "./styled/flex"

interface ConfirmDialogProps {
  isOpen: boolean
  children: React.ReactNode
  confirmAction: () => void
  notConfirmAction: () => void
  confirmText?: string
  notConfirmText?: string
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
  const { isOpen, children, confirmAction, notConfirmAction,
    confirmText = 'Yes', notConfirmText = 'No' } = props

  Modal.setAppElement('#root')

  const theme = useTheme()

  const StyledModal = withConfirmDialogStyle(Modal, theme.colors.background, theme.colors.foreground)

  return (
    <StyledModal isOpen={isOpen}>
        {children}
        <div>
          <Flex style={{ float: "right" }}>
            <Button color={theme.colors.positive} style={{margin: "0 0.3em"}} onClick={confirmAction}>{confirmText}</Button>
            <Button color={theme.colors.negative} style={{margin: "0 0.3em"}} onClick={notConfirmAction}>{notConfirmText}</Button>
          </Flex>
        </div>
    </StyledModal>
  )
}

export default ConfirmDialog