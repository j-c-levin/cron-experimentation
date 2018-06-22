export interface Matcher {
    match(input: number): boolean;
    isValid(input: string): boolean;
}
export interface Parser {
    name: string;
    match(input: number): boolean;
}
export interface MatcherProperties {
    minValue: number;
    maxValue: number;
    step?: number;
}