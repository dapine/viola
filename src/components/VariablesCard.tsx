import { useContext } from "react"
import { ActionType } from "../store/action"
import { StoreContext } from "../store/StoreContext"
import { Variable, VariableType } from "../types/variable"
import DropdownButton from "./DropdownButton"
import { Button } from "./styled/button"
import { StyledCardBase } from './styled/card'
import { Circle } from "./styled/circle"
import { Separator } from "./styled/separator"

interface VariablesCardProps {
}

const renderVariable = (variable: Variable) => {
  const spacing = { marginLeft: "0.5em" }
  switch (variable.type) {
    case VariableType.Color:
      return <div><Circle color={variable.value} /> <span style={spacing}>Color variable</span></div>
    case VariableType.Position:
      return <div><span style={{ fontSize: "x-large" }}><b>⤱</b></span> <span style={spacing}>Position ({variable.value})</span></div>
    case VariableType.TextFormatting:
      return <div><span style={{ fontSize: "x-large" }}><b>ℱ</b></span> <span style={spacing}>Text formatting ({variable.value})</span></div>
  }
}

const VariablesCard: React.FC<VariablesCardProps> = () => {
  const { state, dispatch } = useContext(StoreContext)

  return (
    <StyledCardBase style={{ margin: "1rem" }}>
      <div>
        {state.variables.map((variable, i) => {
          return renderVariable(variable)
        })}
      </div>

      <div style={{ marginTop: "1em" }}>
        <DropdownButton id="variable-type-selection" text="New ▾">
          <div>
            <div><b><small>Select the type:</small></b></div>
            <div style={{ marginTop: "0.6em" }}>
              <Button link onClick={
                () => dispatch({
                  type: ActionType.ADD_VARIABLE,
                  payload: { type: VariableType.Color, value: "#ff0000" } as Variable
                })
              }>Color</Button>
              <Separator />
              <Button link onClick={
                () => dispatch({
                  type: ActionType.ADD_VARIABLE,
                  payload: { type: VariableType.Position, value: "default" } as Variable
                })
              }>Position</Button>
              <Separator />
              <Button link onClick={
                () => dispatch({
                  type: ActionType.ADD_VARIABLE,
                  payload: { type: VariableType.TextFormatting, value: "default" } as Variable
                })
              }>Text Formatting</Button>
              <Separator />
            </div>
          </div>
        </DropdownButton>
      </div>
    </StyledCardBase>
  )
}

export default VariablesCard