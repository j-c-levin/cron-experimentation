import { expect } from 'chai';
import { NumberMatcher } from './numberMatcher';

describe('Number Matcher', () => {
    let testMatcher: NumberMatcher;
    const testProperties = { minValue: 0, maxValue: 100 };
    beforeEach(() => {
        testMatcher = new NumberMatcher(testProperties);
    });
    describe('isValid()', () => {
        it('parses the max value', () => {
            expect(testMatcher.isValid(testProperties.maxValue.toString())).to.be.true;
        });
        it('parses the min value', () => {
            expect(testMatcher.isValid(testProperties.minValue.toString())).to.be.true;
        });
        it('parses a number in the range', () => {
            const value = (testProperties.maxValue + testProperties.minValue) / 2;
            expect(testMatcher.isValid(value.toString())).to.be.true;
        });
        it('rejects a character', () => {
            expect(testMatcher.isValid('hello')).to.be.false;
        });
        it('rejects a symbol', () => {
            expect(testMatcher.isValid('*')).to.be.false;
        });
        it('rejects a mix', () => {
            expect(testMatcher.isValid('2a3')).to.be.false;
        });
        it('throws on a number above the maximum', () => {
            const value = testProperties.maxValue + 1;
            expect(() => {
                testMatcher.isValid(value.toString());
            }).to.throw(`Value ${value} as a single number is out of the range of ${testProperties.minValue} to ${testProperties.maxValue}`);
        });
        it('throws on a number below the minimum', () => {
            const value = testProperties.minValue - 1;
            expect(() => {
                testMatcher.isValid(value.toString());
            }).to.throw(`Value ${value} as a single number is out of the range of ${testProperties.minValue} to ${testProperties.maxValue}`);
        });
        it('throws on a non-integer', () => {
            const value = testProperties.minValue + 0.5;
            expect(() => {
                testMatcher.isValid(value.toString());
            }).to.throw(`Value ${value} as a single number is not a whole number between ${testProperties.minValue} and ${testProperties.maxValue}`);
        });
    });
    describe('match()', () => {
        it('matches correctly', () => {
            const value = testProperties.minValue;
            testMatcher.isValid(value.toString());
            expect(testMatcher.match(value)).to.be.true;
        });
        it('does not match correctly', () => {
            const value = testProperties.minValue;
            testMatcher.isValid(value.toString());
            expect(testMatcher.match(value + 1)).to.be.false;
        });
    });
});
