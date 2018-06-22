import { Matcher, MatcherProperties, Parser } from '../interfaces';
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
    dec: '12'
}

export class MonthParser implements Parser {
    properties: MatcherProperties = {
        minValue: 1,
        maxValue: 12
    }
    name = 'month        ';
    value: Matcher = new NoMatcher();
    children: Parser[] = [];

    constructor(input: string) {
        this.splitDataString(input);
    }

    match(input: number): boolean {

        if (this.value === null) {
            throw new Error(`Trying to match a minute input which is null`);
        }
        return this.value.match(input) || this.children.some(child => child.match(input));
    }

    splitDataString(input: string): void {

        // Input is a list, must check this first for recursion to work
        if (input.includes(',')) {
            // Split into elements
            const list = input.split(',');
            // Create new Parsers recursively with the individual elements
            list.forEach(element => {
                this.children.push(new MonthParser(element));
            });
            return;
        }

        // Parse days into numbers
        input = this.parseMonthString(input);

        // Input is a range
        const rangeMatcher = new RangeMatcher(this.properties);
        if (rangeMatcher.isValid(input)) {
            this.value = rangeMatcher;
            return;
        }

        // Input as an asterix, matches with any value
        const anyMatcher = new AnyMatcher(this.properties);
        if (anyMatcher.isValid(input)) {
            this.value = anyMatcher;
            return;
        }

        // Input is a raw number, matches with specific value
        const numberMatcher = new NumberMatcher(this.properties);
        if (numberMatcher.isValid(input)) {
            this.value = numberMatcher;
            return;
        }

        // Input matches no known type, throw error
        throw new Error(`Input ${input} as a minute does not match any known type`);
    }

    parseMonthString(input: string): string {
        // If input is a range, deal with each side separately
        if (input.includes('-')) {
            const split = input.split('-').map(half => {
                return this.parseMonthString(half);
            });
            return split.join('-');
        }
        // Is input a number or any
        if (isNaN(Number(input)) === false || input.includes('*')) {
            // Input is a number or any, doesn't need to be parser
            return input;
        }
        // Input is a string, check if it matches
        const conversion = (input.includes('/')) ? `${months[input.split('/')[0].toLowerCase()]}/${input.split('/')[1]}` : months[input.toLowerCase()]
        if (typeof conversion === 'undefined') {
            throw new Error(`Month input ${input} does not match to a known month`);
        }
        return conversion;
    }
}