import { DayOfMonthParser } from './dayOfMonthParser';
import { expect } from 'chai';

describe('Day Of Month Parser', () => {
    describe('constructor()', () => {
        it('creates with the minimum value', () => {
            expect(() => {
                new DayOfMonthParser('1');
            }).to.not.throw();
        });
        it('creates with the maximum value', () => {
            expect(() => {
                new DayOfMonthParser('30');
            }).to.not.throw();
        });
        it('creates in the middle of the range', () => {
            expect(() => {
                new DayOfMonthParser('15');
            }).to.not.throw();
        });
        it('errors below the minimum', () => {
            expect(() => {
                new DayOfMonthParser('0');
            }).to.throw();
        });
        it('errors above the maximum', () => {
            expect(() => {
                new DayOfMonthParser('32');
            }).to.throw();
        });
        it('creates creates with a list', () => {
            expect(() => {
                new DayOfMonthParser('1,2,3');
            }).to.not.throw();
        });
        it('errors with a list out of range', () => {
            expect(() => {
                new DayOfMonthParser('0,32');
            }).to.throw();
        });
        it('errors with a list both out and in range', () => {
            expect(() => {
                new DayOfMonthParser('0,15,32');
            }).to.throw();
        });
        it('creates with an any symbol', () => {
            expect(() => {
                new DayOfMonthParser('*');
            }).to.not.throw();
        });
        it('creates with a list with an any symbol', () => {
            expect(() => {
                new DayOfMonthParser('1,5,*');
            }).to.not.throw();
        });
        it('errors with a list with an any symbol that is out of range', () => {
            expect(() => {
                new DayOfMonthParser('1,5,*,32');
            }).to.throw();
        });
        it('errors with an unidentified symbol', () => {
            expect(() => {
                new DayOfMonthParser('%');
            }).to.throw();
        });
        it('errors with an unidentified symbol in a list', () => {
            expect(() => {
                new DayOfMonthParser('1,5,%,*');
            }).to.throw();
        });
        it('creates with a range', () => {
            expect(() => {
                new DayOfMonthParser('1-15');
            }).to.not.throw();
        });
        it('creates with a range and an any symbol', () => {
            expect(() => {
                new DayOfMonthParser('1-*');
            }).to.not.throw();
        });
        it('creates with a list and a range', () => {
            expect(() => {
                new DayOfMonthParser('2,5-10,12');
            }).to.not.throw();
        });
        it('creates with a list and a range and any symbol', () => {
            expect(() => {
                new DayOfMonthParser('2,5-*,*');
            }).to.not.throw();
        });
        it('creates with a step', () => {
            expect(() => {
                new DayOfMonthParser('1-10/2');
            }).to.not.throw();
        });
        it('creates with a step and any symbol in a range', () => {
            expect(() => {
                new DayOfMonthParser('1-*/2');
            }).to.not.throw();
        });
        it('creates with a step and any symbol in a list', () => {
            expect(() => {
                new DayOfMonthParser('15,20-25/2,*');
            }).to.not.throw();
        });
        it('creates with a step and any symbol', () => {
            expect(() => {
                new DayOfMonthParser('*/10');
            }).to.not.throw();
        });
        it('rejects a step without a range', () => {
            expect(() => {
                new DayOfMonthParser('5/10');
            }).to.throw();
        });
    });
});
