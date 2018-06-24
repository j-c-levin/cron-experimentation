import { expect } from 'chai';
import { AnyMatcher } from './anyMatcher';

describe('Any Matcher', () => {
    let testMatcher: AnyMatcher;
    const testProperties = { minValue: 0, maxValue: 100 };
    beforeEach(() => {
        testMatcher = new AnyMatcher(testProperties);
    });
    describe('Match()', () => {
        it('matches the minimum value', () => {
            expect(testMatcher.match(testProperties.minValue)).to.be.true;
        });
        it('matches the maximum value', () => {
            expect(testMatcher.match(testProperties.maxValue)).to.be.true;
        });
        it('matches in the range', () => {
            const value = (testProperties.maxValue + testProperties.minValue) / 2;
            expect(testMatcher.match(value)).to.be.true;
        });
        it('does not match under the min value', () => {
            const value = testProperties.minValue - 1;
            expect(testMatcher.match(value)).to.be.false;
        });
        it('does not match above the max value', () => {
            const value = testProperties.maxValue + 1;
            expect(testMatcher.match(value)).to.be.false;
        });
    });
    describe('isValid()', () => {
        it('parses correctly', () => {
            expect(testMatcher.isValid('*')).to.be.true;
        });
        it('parses a step value', () => {
            expect(testMatcher.isValid('*/2')).to.be.true;
        });
        it('fails on number input', () => {
            expect(testMatcher.isValid('1')).to.be.false;
        });
        it('fails on symbol input', () => {
            expect(testMatcher.isValid('%')).to.be.false;
        });
        it('fails on a bad step value', () => {
            expect(testMatcher.isValid('3/2')).to.be.false;
        });
    });
});
