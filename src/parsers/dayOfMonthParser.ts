import { IMatcher, IMatcherProperties, IParser } from '../interfaces';
import { AnyMatcher } from '../matchers/anyMatcher';
import { NoMatcher } from '../matchers/noMatcher';
import { NumberMatcher } from '../matchers/numberMatcher';
import { RangeMatcher } from '../matchers/rangeMatcher';
import { DayOfWeekParser } from './dayOfWeekParser';
import { ListMatcher } from '../matchers/listMatcher';

export class DayOfMonthParser implements IParser {
    public name = 'day of month ';
    private properties: IMatcherProperties = {
        minValue: 1,
        maxValue: 31,
    };
    private value: IMatcher;
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
        const listMatcher = new ListMatcher();
        if (listMatcher.isValid(input)) {
            this.children = listMatcher.getListChildren(DayOfMonthParser);
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
        throw new Error(`Input ${input} as a day of month does not match any known type`);
    }
}
