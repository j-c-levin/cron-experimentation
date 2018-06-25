export interface IMatcher {
    match(input: number): boolean;
    isValid(input: string): boolean;
}

export interface IParser {
    name: string;
    match(input: number): boolean;
}

export interface IMatcherProperties {
    minValue: number;
    maxValue: number;
    step?: number;
}

export interface IStepResponse {
    hasStep: boolean;
    stepValue?: number;
    mainValue?: string;
}
