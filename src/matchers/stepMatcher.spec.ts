import { expect } from 'chai';
import { StepMatcher, IStepResponse } from './stepMatcher';

describe('Step Matcher', () => {
    describe('parse()', () => {
        it('parses correctly', () => {
            const expectedResponse: IStepResponse = {
                hasStep: true,
                mainValue: '1',
                stepValue: 2,
            };
            expect(StepMatcher.parse('1/2')).to.deep.equal(expectedResponse);
        });
        it('parses an any symbol', () => {
            const expectedResponse: IStepResponse = {
                hasStep: true,
                mainValue: '*',
                stepValue: 5,
            };
            expect(StepMatcher.parse('*/5')).to.deep.equal(expectedResponse);
        });
        it('rejects when there is no step', () => {
            const expectedResponse: IStepResponse = { hasStep: false };
            expect(StepMatcher.parse('5')).to.deep.equal(expectedResponse);
        });
        it('throws if step is not an integer', () => {
            expect(() => { StepMatcher.parse('2/5.5'); }).to.throw(`/step value in 2/5.5 is not a valid integer`);
        });
    });
});
