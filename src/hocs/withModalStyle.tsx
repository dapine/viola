export const withConfirmDialogStyle = (Modal: any, bgColor: string, fgColor: string) => {
  const content = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: "40%",
      backgroundColor: bgColor,
      color: fgColor
    }
  }

  const hoc = (props: any) => {
    return <Modal {...props} style={content}>{props.children}</Modal>
  }

  return hoc
}