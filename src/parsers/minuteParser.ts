import { IMatcher, IMatcherProperties, IParser } from '../interfaces';
import { AnyMatcher } from '../matchers/anyMatcher';
import { NoMatcher } from '../matchers/noMatcher';
import { NumberMatcher } from '../matchers/numberMatcher';
import { RangeMatcher } from '../matchers/rangeMatcher';

export class MinuteParser implements IParser {
    public name = 'minute       ';
    private properties: IMatcherProperties = {
        minValue: 0,
        maxValue: 59,
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
                this.children.push(new MinuteParser(element));
            });
            return new NoMatcher();
        }

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
        throw new Error(`Input ${input} as a minute does not match any known type`);
    }
}
