export interface Variable {
  type: VariableType
  value: string
}

export enum VariableType {
  Color,
  Position,
  TextFormatting,
}