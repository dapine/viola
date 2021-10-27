import { ReactElement } from "react";
import "./Dialog.css"

interface DialogProps {
  children?: ReactElement
}

const Dialog: React.FC<DialogProps> = props => {
  return (
    <div className="dialog">
      {props.children}
    </div>
  );
}

export default Dialog