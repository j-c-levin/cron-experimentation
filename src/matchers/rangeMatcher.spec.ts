import { expect } from 'chai';
import { RangeMatcher } from './rangeMatcher';

describe('Range Matcher', () => {
    let testMatcher: RangeMatcher;
    const testProperties = { minValue: 1, maxValue: 100 };
    beforeEach(() => {
        testMatcher = new RangeMatcher(JSON.parse(JSON.stringify(testProperties)));
    });
    describe('isValid()', () => {
        it('accepts a range', () => {
            const range = `${testProperties.minValue}-${testProperties.maxValue}`;
            expect(testMatcher.isValid(range)).to.be.true;
        });
        it('accepts an any symbol in the start', () => {
            const range = `*-${testProperties.maxValue}`;
            expect(testMatcher.isValid(range)).to.be.true;
        });
        it('accepts an any symbol in the end', () => {
            const range = `${testProperties.minValue}-*`;
            expect(testMatcher.isValid(range)).to.be.true;
        });
        it('accepts an any symbol in both positions', () => {
            const range = `*-*`;
            expect(testMatcher.isValid(range)).to.be.true;
        });
        it('accepts a step symbol in the end', () => {
            const range = `${testProperties.minValue}-${testProperties.maxValue}/2`;
            expect(testMatcher.isValid(range)).to.be.true;
        });
        it('throws on a range with a character', () => {
            const range = `${testProperties.minValue}-hello`;
            expect(() => { testMatcher.isValid(range); }).to.throw(`Invalid range element hello in ${range}`);
        });
        it('throws on a negative number', () => {
            const range = `-1-${testProperties.maxValue}`;
            expect(() => { testMatcher.isValid(range); }).to.throw('Invalid range element  in -1');
        });
        it('throws on a negative number', () => {
            const range = `-1`;
            expect(() => { testMatcher.isValid(range); }).to.throw('Invalid range element  in -1');
        });
        it('throws on a number outside the start', () => {
            const range = `${testProperties.minValue - 1}-${testProperties.maxValue}`;
            expect(() => { testMatcher.isValid(range); }).to.throw(`Value ${testProperties.minValue - 1} as a range is not between ${testProperties.minValue} to ${testProperties.maxValue}`);
        });
        it('throws on a number outside the end', () => {
            const range = `${testProperties.minValue}-${testProperties.maxValue + 1}`;
            expect(() => { testMatcher.isValid(range); }).to.throw(`Value ${testProperties.maxValue + 1} as a range is not between ${testProperties.minValue} to ${testProperties.maxValue}`);
        });
        it('throws on a number outside the end and start', () => {
            const range = `${testProperties.minValue - 1}-${testProperties.maxValue + 1}`;
            expect(() => { testMatcher.isValid(range); }).to.throw(`Value ${testProperties.minValue - 1} as a range is not between ${testProperties.minValue} to ${testProperties.maxValue}`);
        });
        it('throws if the end is earlier than the start', () => {
            const range = `${testProperties.maxValue}-${testProperties.minValue}`;
            expect(() => { testMatcher.isValid(range); }).to.throw(`Invalid range ${range}, the start value must be less than the end value`);
        });
        it('throws if the start is the same as the end', () => {
            const range = `${testProperties.maxValue}-${testProperties.maxValue}`;
            expect(() => { testMatcher.isValid(range); }).to.throw(`Invalid range ${range}, the start value must be less than the end value`);
        });
    });
    describe('match()', () => {
        it('matches the start of the range', () => {
            const range = `${testProperties.minValue}-${testProperties.maxValue}`;
            testMatcher.isValid(range);
            expect(testMatcher.match(testProperties.minValue)).to.be.true;
        });
        it('matches the end of the range', () => {
            const range = `${testProperties.minValue}-${testProperties.maxValue}`;
            testMatcher.isValid(range);
            expect(testMatcher.match(testProperties.maxValue)).to.be.true;
        });
        it('matches the middle of the range', () => {
            const range = `${testProperties.minValue}-${testProperties.maxValue}`;
            testMatcher.isValid(range);
            const value = (testProperties.minValue + testProperties.maxValue) / 2;
            expect(testMatcher.match(value)).to.be.true;
        });
        it('matches with an any', () => {
            const range = `${testProperties.minValue}-*`;
            testMatcher.isValid(range);
            const value = (testProperties.minValue + testProperties.maxValue) / 2;
            expect(testMatcher.match(value)).to.be.true;
        });
        it('matches with a step', () => {
            const range = `${testProperties.minValue}-*/2`;
            testMatcher.isValid(range);
            const value = testProperties.minValue * 2;
            expect(testMatcher.match(value)).to.be.true;
        });
        it('does not match if out of step', () => {
            const range = `${testProperties.minValue}-*/2`;
            testMatcher.isValid(range);
            const value = (testProperties.minValue * 2) + 1;
            expect(testMatcher.match(value)).to.be.false;
        });
        it('does not match before the start', () => {
            const range = `${testProperties.minValue}-${testProperties.maxValue}`;
            testMatcher.isValid(range);
            expect(testMatcher.match(testProperties.minValue - 1)).to.be.false;
        });
        it('does not match after the end', () => {
            const range = `${testProperties.minValue}-${testProperties.maxValue}`;
            testMatcher.isValid(range);
            expect(testMatcher.match(testProperties.maxValue + 1)).to.be.false;
        });
        it('throws if isValid() has not been called', () => {
            expect(() => { testMatcher.match(testProperties.maxValue); }).to.throw('Attempting to match range without setting using isValid first');
        });
    });
});
