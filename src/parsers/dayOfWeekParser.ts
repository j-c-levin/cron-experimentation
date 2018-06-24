import { Matcher, MatcherProperties, Parser } from '../interfaces';
import { AnyMatcher } from '../matchers/anyMatcher';
import { NoMatcher } from '../matchers/noMatcher';
import { NumberMatcher } from '../matchers/numberMatcher';
import { RangeMatcher } from '../matchers/rangeMatcher';

const days: { [day: string]: string } = {
    sun: '0',
    mon: '1',
    tue: '2',
    wed: '3',
    thu: '4',
    fri: '5',
    sat: '6',
};

export class DayOfWeekParser implements Parser {
    public name = 'day of week  ';
    private properties: MatcherProperties = {
        minValue: 0,
        maxValue: 7,
    };
    private value: Matcher;
    private children: Parser[] = [];

    constructor(input: string) {
        this.value = this.splitDataString(input);
    }

    // Match either in this object or in any child objects
    public match(input: number): boolean {
        return this.value.match(input) || this.children.some((child) => child.match(input));
    }

    private splitDataString(input: string): Matcher {

        // Input is a list, must check this first for recursion to work
        if (input.includes(',')) {
            // Split into elements
            const list = input.split(',');
            // Create new Parsers recursively with the individual elements
            list.forEach((element) => {
                this.children.push(new DayOfWeekParser(element));
            });
            // Matching will be handled by the children
            return new NoMatcher();
        }

        // Parse days into numbers
        input = this.parseDayString(input);

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
        throw new Error(`Input ${input} as a day of week does not match any known type`);
    }

    private parseDayString(input: string): string {
        // If input is a range, deal with each side separately
        if (input.includes('-')) {
            const split = input.split('-').map((half, index) => {
                // Match sunday at start or end
                if (half.toLowerCase() === 'sun') {
                    return (index === 0) ? '0' : '7';
                }
                return this.parseDayString(half);
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
        const conversion = days[parsedInput.toLowerCase()];
        if (typeof conversion === 'undefined') {
            throw new Error(`Day of week input ${input} does not match to a known day of the week`);
        }
        return conversion + step;
    }
}
