import { Matcher, MatcherProperties, Parser } from '../interfaces';
import { AnyMatcher } from '../matchers/anyMatcher';
import { NoMatcher } from '../matchers/noMatcher';
import { NumberMatcher } from '../matchers/numberMatcher';
import { RangeMatcher } from '../matchers/rangeMatcher';

export class HourParser implements Parser {
    properties: MatcherProperties = {
        minValue: 0,
        maxValue: 23
    }
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
                this.children.push(new HourParser(element));
            });
            return;
        }

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
}