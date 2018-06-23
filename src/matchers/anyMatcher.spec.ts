import { expect } from 'chai';
import { AnyMatcher } from './anyMatcher';

describe('Any Matcher', () => {
    describe('Match()', () => {
        let testMatcher: AnyMatcher;
        const testProperties = { minValue: 0, maxValue: 100 };
        beforeEach(() => {
            testMatcher = new AnyMatcher(testProperties);
        });
        it('matches the minimum value', () => {
            expect(testMatcher.match(testProperties.minValue)).to.be.true;
        });
    });
});
