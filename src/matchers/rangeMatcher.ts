import { Matcher, MatcherProperties } from '../interfaces';
import { StepMatcher } from './stepMatcher';

const index = {
    start: 0,
    end: 1,
};

export class RangeMatcher implements Matcher {
    private properties: MatcherProperties;
    private range: { start: number, end: number } | null = null;

    constructor(properties: MatcherProperties) {
        this.properties = properties;
    }

    public isValid(value: string): boolean {
        // Range must include a hyphen
        if (value.includes('-') === false) {
            return false;
        }
        const values = value.split('-');
        // console.log(values);
        if (values.length > 2) {
            throw new Error(`Invalid range ${value}, there must not be any negative numbers`);
        }
        // Check for step value
        const stepResponse = StepMatcher.parse(values[index.end]);
        if (stepResponse.hasStep) {
            if (typeof stepResponse.mainValue === 'undefined' || typeof stepResponse.stepValue === 'undefined') {
                throw new Error(`Step response for ${values[index.end]} is true but there is no main or step value, this is a developer error`);
            }
            this.properties.step = stepResponse.stepValue;
            values[index.end] = stepResponse.mainValue;
        }
        // Standard number checks
        values.forEach((element) => {
            // Input is an 'any' symbol, map to max/min value
            if (element === '*') {
                const position = (element === values[index.start]) ? index.start : index.end;
                element = (position === index.start) ? this.properties.minValue.toString() : this.properties.maxValue.toString();
                values[position] = element;
            }
            // Input does not parse to a number
            if (isNaN(Number(element)) || element === '') {
                throw new Error(`Invalid range element ${element} in ${value}`);
            }
            // Input is not in a valid range
            if (Number(element) < this.properties.minValue || Number(element) > this.properties.maxValue) {
                throw new Error(`Value ${element} as a range is not between ${this.properties.minValue} to ${this.properties.maxValue}`);
            }
            // Input is not an integer
            if (element.includes('.')) {
                throw new Error(`Value ${element} as a range is not a whole number between ${this.properties.minValue} and ${this.properties.maxValue}`);
            }
            return true;
        });
        // Check start is before end
        if (Number(values[index.start]) >= Number(values[index.end])) {
            throw new Error(`Invalid range ${value}, the start value must be less than the end value`);
        }
        // Save to the range member variable
        this.range = {
            start: Number(values[index.start]),
            end: Number(values[index.end]),
        };
        return true;
    }

    public match(value: number): boolean {
        if (this.range === null) {
            throw new Error('Attempting to match range without setting using isValid first');
        }
        // If there is a step, match against that
        if (typeof this.properties.step !== 'undefined' && value % this.properties.step !== 0) {
            return false;
        }
        return value >= this.range.start && value <= this.range.end;
    }
}
