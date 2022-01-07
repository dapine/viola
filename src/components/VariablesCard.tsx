import { useContext } from "react"
import { CompactPicker } from "react-color"
import { ActionType } from "../store/action"
import { StoreContext } from "../store/StoreContext"
import { Variable, VariableType } from "../types/variable"
import colors from "../utils/colors"
import Dropdown from "./Dropdown"
import { Button } from "./styled/button"
import { StyledCardBase } from './styled/card'
import { Circle } from "./styled/circle"
import { Separator } from "./styled/separator"

interface VariablesCardProps {
}

const VariablesCard: React.FC<VariablesCardProps> = () => {
  const { state, dispatch } = useContext(StoreContext)

  const renderVariable = (variable: Variable, index: number) => {
    const spacing = { marginLeft: "0.5em" }
    switch (variable.type) {
      case VariableType.Color:
        return (
          <div>
            <Circle color={variable.value} />
            <span style={spacing}>Color variable</span>
            <Dropdown link text='✏️'>
              <CompactPicker
                onChangeComplete={(color) => {
                  dispatch({
                    type: ActionType.SET_VARIABLE_VALUE,
                    payload: { i: index, value: color.hex }
                  })
                }}
                colors={colors}
              />
            </Dropdown>
          </div>
        )
      case VariableType.Position:
        return (
          <div>
            <span style={{ fontSize: "x-large" }}><b>⤱</b></span>
            <span style={spacing}>
              <Dropdown text={`Position (${variable.value}) ▾`}>
                <div>
                  <div><b><small>Select the position:</small></b></div>
                  <div style={{ marginTop: "0.6em" }}>
                    <Button link onClick={
                      () => dispatch({
                        type: ActionType.SET_VARIABLE_VALUE,
                        payload: { i: index, value: "top" }
                      })
                    }>Top</Button>
                    <Separator />
                    <Button link onClick={
                      () => dispatch({
                        type: ActionType.SET_VARIABLE_VALUE,
                        payload: { i: index, value: "bottom" }
                      })
                    }>Bottom</Button>
                  </div>
                </div>
              </Dropdown>
            </span>
          </div>
        )
      case VariableType.TextFormatting:
        return (
          <div>
            <span style={{ fontSize: "x-large" }}><b>ℱ</b></span>
            <span style={spacing}>
              <Dropdown text={`Text formatting (${variable.value}) ▾`}>
                <div>
                  <div><b><small>Select the text formatting:</small></b></div>
                  <div style={{ marginTop: "0.6em" }}>
                    <Button link onClick={
                      () => dispatch({
                        type: ActionType.SET_VARIABLE_VALUE,
                        payload: { i: index, value: "bold" }
                      })
                    }>Bold</Button>
                    <Separator />
                    <Button link onClick={
                      () => dispatch({
                        type: ActionType.SET_VARIABLE_VALUE,
                        payload: { i: index, value: "italic" }
                      })
                    }>Italic</Button>
                    <Separator />
                    <Button link onClick={
                      () => dispatch({
                        type: ActionType.SET_VARIABLE_VALUE,
                        payload: { i: index, value: "underline" }
                      })
                    }>Underline</Button>
                  </div>
                </div>

              </Dropdown>
            </span>
          </div>
        )
    }
  }

  return (
    <StyledCardBase style={{ margin: "1rem" }}>
      <div>
        {state.variables.map((variable, i) => {
          return renderVariable(variable, i)
        })}
      </div>

      <div style={{ marginTop: "1em" }}>
        <Dropdown text="New ▾">
          <div>
            <div><b><small>Select the type:</small></b></div>
            <div style={{ marginTop: "0.6em" }}>
              <Button link onClick={
                () => dispatch({
                  type: ActionType.ADD_VARIABLE,
                  payload: { type: VariableType.Color, value: "#ffffff" } as Variable
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
        </Dropdown>
      </div>
    </StyledCardBase>
  )
}

export default VariablesCard