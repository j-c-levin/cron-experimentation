import { DayOfWeekParser } from './dayOfWeekParser';
import { expect } from 'chai';

describe('Day Of Week Parser', () => {
    describe('constructor()', () => {
        it('creates with the minimum value', () => {
            expect(() => {
                new DayOfWeekParser('0');
            }).to.not.throw();
        });
        it('creates with the maximum value', () => {
            expect(() => {
                new DayOfWeekParser('7');
            }).to.not.throw();
        });
        it('creates in the middle of the range', () => {
            expect(() => {
                new DayOfWeekParser('5');
            }).to.not.throw();
        });
        it('errors below the minimum', () => {
            expect(() => {
                new DayOfWeekParser('-1');
            }).to.throw();
        });
        it('errors above the maximum', () => {
            expect(() => {
                new DayOfWeekParser('8');
            }).to.throw();
        });
        it('creates creates with a list', () => {
            expect(() => {
                new DayOfWeekParser('1,2,3');
            }).to.not.throw();
        });
        it('errors with a list out of range', () => {
            expect(() => {
                new DayOfWeekParser('-1,8');
            }).to.throw();
        });
        it('errors with a list both out and in range', () => {
            expect(() => {
                new DayOfWeekParser('0,7,8');
            }).to.throw();
        });
        it('creates with an any symbol', () => {
            expect(() => {
                new DayOfWeekParser('*');
            }).to.not.throw();
        });
        it('creates with a list with an any symbol', () => {
            expect(() => {
                new DayOfWeekParser('1,5,*');
            }).to.not.throw();
        });
        it('errors with a list with an any symbol that is out of range', () => {
            expect(() => {
                new DayOfWeekParser('1,5,*,32');
            }).to.throw();
        });
        it('errors with an unidentified symbol', () => {
            expect(() => {
                new DayOfWeekParser('%');
            }).to.throw();
        });
        it('errors with an unidentified symbol in a list', () => {
            expect(() => {
                new DayOfWeekParser('1,5,%,*');
            }).to.throw();
        });
        it('creates with a range', () => {
            expect(() => {
                new DayOfWeekParser('1-7');
            }).to.not.throw();
        });
        it('creates with a range and an any symbol', () => {
            expect(() => {
                new DayOfWeekParser('1-*');
            }).to.not.throw();
        });
        it('creates with a list and a range', () => {
            expect(() => {
                new DayOfWeekParser('0,1,2-4,7');
            }).to.not.throw();
        });
        it('creates with a list and a range and any symbol', () => {
            expect(() => {
                new DayOfWeekParser('2,5-*,*');
            }).to.not.throw();
        });
        it('creates with a step', () => {
            expect(() => {
                new DayOfWeekParser('1-6/2');
            }).to.not.throw();
        });
        it('creates with a step and any symbol in a range', () => {
            expect(() => {
                new DayOfWeekParser('1-*/2');
            }).to.not.throw();
        });
        it('creates with a step and any symbol in a list', () => {
            expect(() => {
                new DayOfWeekParser('0,2-7/3,*');
            }).to.not.throw();
        });
        it('creates with a step and any symbol', () => {
            expect(() => {
                new DayOfWeekParser('*/10');
            }).to.not.throw();
        });
        it('rejects a step without a range', () => {
            expect(() => {
                new DayOfWeekParser('5/10');
            }).to.throw();
        });
        it('accepts mon as input', () => {
            expect(() => {
                new DayOfWeekParser('mon');
            }).to.not.throw();
        });
        it('accepts tue as input', () => {
            expect(() => {
                new DayOfWeekParser('tue');
            }).to.not.throw();
        });
        it('accepts wed as input', () => {
            expect(() => {
                new DayOfWeekParser('wed');
            }).to.not.throw();
        });
        it('accepts thu as input', () => {
            expect(() => {
                new DayOfWeekParser('thu');
            }).to.not.throw();
        });
        it('accepts fri as input', () => {
            expect(() => {
                new DayOfWeekParser('fri');
            }).to.not.throw();
        });
        it('accepts sat as input', () => {
            expect(() => {
                new DayOfWeekParser('sat');
            }).to.not.throw();
        });
        it('accepts sun as input', () => {
            expect(() => {
                new DayOfWeekParser('sun');
            }).to.not.throw();
        });
        it('errors on non-day used', () => {
            expect(() => {
                new DayOfWeekParser('jan');
            }).to.throw();
        });
        it('accepts a range of days as input', () => {
            expect(() => {
                new DayOfWeekParser('mon-wed');
            }).to.not.throw();
        });
        it('accepts a range of days and any symbols as input', () => {
            expect(() => {
                new DayOfWeekParser('mon-*');
            }).to.not.throw();
        });
        it('accepts a range of days and numbers as input', () => {
            expect(() => {
                new DayOfWeekParser('mon-5');
            }).to.not.throw();
        });
        it('accepts a range of days and numbers in a list as input', () => {
            expect(() => {
                new DayOfWeekParser('mon-5,7');
            }).to.not.throw();
        });
        it('errors on non-day used in a list', () => {
            expect(() => {
                new DayOfWeekParser('jan, mon');
            }).to.throw();
        });
        it('errors on non-day used in a range', () => {
            expect(() => {
                new DayOfWeekParser('tue-far');
            }).to.throw();
        });
    });
});
