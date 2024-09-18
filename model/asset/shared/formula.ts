export enum Operator {
    ADDITION,
    MULTIPLICATION,
    SUBTRACTION,
    DIVISION
}

export interface Formula {
    operator: Operator
    argument: number
}