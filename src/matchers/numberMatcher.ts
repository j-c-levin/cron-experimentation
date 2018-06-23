import { Matcher, MatcherProperties } from "../interfaces";

const index = {
    end: 1,
    start: 0,
};

export class NumberMatcher implements Matcher {
    private properties: MatcherProperties;
    private value: number | null = null;

    constructor(properties: MatcherProperties) {
        this.properties = properties;
    }

    public isValid(input: string): boolean {
        // Input does not parse to a number
        if (isNaN(Number(input))) {
            return false;
        }
        // Input is not in a valid range
        if (Number(input) < this.properties.minValue || Number(input) > this.properties.maxValue) {
            throw new Error(`Value ${input} as a single number is out of the range of ${this.properties.minValue} to ${this.properties.maxValue}`);
        }
        // Input is not an integer
        if (input.includes('.')) {
            throw new Error(`Value ${input} as a single number is not a whole number between ${this.properties.minValue} and ${this.properties.maxValue}`);
        }
        this.value = Number(input);
        return true;
    }

    public match(input: number): boolean {
        return input === this.value;
    }
}
