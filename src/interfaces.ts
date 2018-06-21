export interface Matcher {
    match(value: Number): boolean;
    isValid(value: string): boolean;
}
export interface Parser {
    match(value: Number): boolean;
}
export interface MatcherProperties {
    minValue: Number;
    maxValue: Number;
}