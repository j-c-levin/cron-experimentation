import { expect } from 'chai';
import { NoMatcher } from './noMatcher';

describe('No Matcher', () => {
    let testMatcher: NoMatcher;
    beforeEach(() => {
        testMatcher = new NoMatcher();
    });
    describe('isValid()', () => {
        it('return false', () => {
            expect(testMatcher.isValid()).to.be.false;
        });
    });
    describe('match()', () => {
        it('returns false', () => {
            expect(testMatcher.match()).to.be.false;
        });
    });
});
