import Modal from "react-modal"

interface ConfirmDialogProps {
  isOpen: boolean
  style: any
  children: React.ReactNode
  confirmAction: () => void
  notConfirmAction: () => void
  confirmText?: string
  notConfirmText?: string
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
  const { isOpen, style, children, confirmAction, notConfirmAction,
    confirmText = 'Yes', notConfirmText = 'No' } = props

  Modal.setAppElement('#root')

  return (
    <Modal
      isOpen={isOpen}
      style={style}
    >
      {children}
      <div>
        <div style={{ float: "right" }}>
          <button onClick={confirmAction}>{confirmText}</button>
          <button onClick={notConfirmAction}>{notConfirmText}</button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmDialog