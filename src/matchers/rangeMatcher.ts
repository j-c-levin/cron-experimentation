import { Matcher, MatcherProperties } from '../interfaces';

const index = {
    start: 0,
    end: 1
}

export class RangeMatcher implements Matcher {
    properties: MatcherProperties
    range: { start: Number, end: Number } | null = null;

    constructor(properties: MatcherProperties) {
        this.properties = properties;
    }

    match(value: Number): boolean {
        if (this.range === null) {
            throw new Error('Attempting to match range without setting using isValid first');
        }
        return value >= this.range.start && value <= this.range.end;
    }

    isValid(value: string): boolean {
        // Range must include a hyphen
        if (value.includes('-') === false) {
            return false;
        }
        const values = value.split('-');
        // Standard number checks
        values.forEach(element => {
            // Input does not parse to a number
            if (isNaN(Number(element))) {
                return false;
            }
            // Input is not in a valid range
            if (Number(element) < this.properties.minValue || Number(element) > this.properties.maxValue) {
                throw new Error(`Value ${element} as a range is not between ${this.properties.minValue} to ${this.properties.maxValue}`);
            }
            // Input is not an integer
            if (element.includes('.')) {
                throw new Error(`Value ${element} as a range is not a whole number between ${this.properties.minValue} and ${this.properties.maxValue}`);
            }
        });
        // Check start is before end
        if (Number(values[index.start]) >= Number(values[index.end])) {
            throw new Error(`Invalid range ${value}, the start value must be less than the end value`);
        }
        // Save to the range member variable
        this.range = {
            start: Number(values[index.start]),
            end: Number(values[index.end])
        }
        return true;
    }


}