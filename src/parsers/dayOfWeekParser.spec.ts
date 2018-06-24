import { DayOfWeekParser } from './DayOfWeekParser';
import { expect } from 'chai';

describe('Day Of Month Parser', () => {
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
        it('accepts monday as input', () => {
            expect(() => {
                new DayOfWeekParser('mon');
            }).to.throw();
        });
    });
});
