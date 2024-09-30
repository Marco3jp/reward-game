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

export function isFormula(value: unknown): value is Formula {
    return typeof value === "object" 
        && value !== null
        && Object.prototype.hasOwnProperty.call(value, "operator")
        && Object.prototype.hasOwnProperty.call(value, "argument")
}
