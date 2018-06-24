import { IMatcher, IMatcherProperties, IParser } from '../interfaces';
import { AnyMatcher } from '../matchers/anyMatcher';
import { NoMatcher } from '../matchers/noMatcher';
import { NumberMatcher } from '../matchers/numberMatcher';
import { RangeMatcher } from '../matchers/rangeMatcher';

const months: { [month: string]: string } = {
    jan: '1',
    feb: '2',
    mar: '3',
    apr: '4',
    may: '5',
    jun: '6',
    jul: '7',
    aug: '8',
    sep: '9',
    oct: '10',
    nov: '11',
    dec: '12',
};

export class MonthParser implements IParser {
    public name = 'month        ';
    private properties: IMatcherProperties = {
        minValue: 1,
        maxValue: 12,
    };
    private value: IMatcher = new NoMatcher();
    private children: IParser[] = [];

    constructor(input: string) {
        this.value = this.splitDataString(input);
    }

    // Match either in this object or in any child objects
    public match(input: number): boolean {
        return this.value.match(input) || this.children.some((child) => child.match(input));
    }

    private splitDataString(input: string): IMatcher {

        // Input is a list, must check this first for recursion to work
        if (input.includes(',')) {
            // Split into elements
            const list = input.split(',');
            // Create new Parsers recursively with the individual elements
            list.forEach((element) => {
                this.children.push(new MonthParser(element));
            });
            return new NoMatcher();
        }

        // Parse days into numbers
        input = this.parseMonthString(input);

        // Input is a range
        const rangeMatcher = new RangeMatcher(this.properties);
        if (rangeMatcher.isValid(input)) {
            return rangeMatcher;
        }

        // Input as an asterix, matches with any value
        const anyMatcher = new AnyMatcher(this.properties);
        if (anyMatcher.isValid(input)) {
            return anyMatcher;
        }

        // Input is a raw number, matches with specific value
        const numberMatcher = new NumberMatcher(this.properties);
        if (numberMatcher.isValid(input)) {
            return numberMatcher;
        }

        // Input matches no known type, throw error
        throw new Error(`Input ${input} as a month does not match any known type`);
    }

    private parseMonthString(input: string): string {
        // If input is a range, deal with each side separately
        if (input.includes('-')) {
            const split = input.split('-').map((half) => {
                return this.parseMonthString(half);
            });
            return split.join('-');
        }

        let parsedInput = input;
        let step = '';
        // Input is a step
        if (input.includes('/')) {
            parsedInput = input.split('/')[0];
            step = input.split('/')[1];
        }

        // Is input a number or any
        if (isNaN(Number(parsedInput)) === false || parsedInput.includes('*')) {
            // Input is a number or any, doesn't need to be parser
            return input;
        }

        // Input is a string, check if it matches
        const conversion = months[parsedInput.toLowerCase()];
        if (typeof conversion === 'undefined') {
            throw new Error(`Month input ${input} does not match to a known month`);
        }
        return conversion + step;
    }
}
