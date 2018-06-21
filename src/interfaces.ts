export interface Matcher {
    match(value: number): boolean;
    isValid(value: string): boolean;
}
export interface Parser {
    match(value: number): boolean;
}
export interface MatcherProperties {
    minValue: number;
    maxValue: number;
    step?: number;
}