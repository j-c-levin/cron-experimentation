import { expect } from 'chai';
import { HourParser } from './hourParser';

describe('Hour Parser', () => {
    describe('constructor()', () => {
        it('creates with the minimum value', () => {
            expect(() => {
                new HourParser('0');
            }).to.not.throw();
        });
        it('creates with the maximum value', () => {
            expect(() => {
                new HourParser('23');
            }).to.not.throw();
        });
        it('creates in the middle of the range', () => {
            expect(() => {
                new HourParser('15');
            }).to.not.throw();
        });
        it('errors below the minimum', () => {
            expect(() => {
                new HourParser('-1');
            }).to.throw();
        });
        it('errors above the maximum', () => {
            expect(() => {
                new HourParser('24');
            }).to.throw();
        });
        it('creates creates with a list', () => {
            expect(() => {
                new HourParser('1,2,3');
            }).to.not.throw();
        });
        it('errors with a list out of range', () => {
            expect(() => {
                new HourParser('-1,24');
            }).to.throw();
        });
        it('errors with a list both out and in range', () => {
            expect(() => {
                new HourParser('0,15,32');
            }).to.throw();
        });
        it('creates with an any symbol', () => {
            expect(() => {
                new HourParser('*');
            }).to.not.throw();
        });
        it('creates with a list with an any symbol', () => {
            expect(() => {
                new HourParser('1,5,*');
            }).to.not.throw();
        });
        it('errors with a list with an any symbol that is out of range', () => {
            expect(() => {
                new HourParser('1,5,*,32');
            }).to.throw();
        });
        it('errors with an unidentified symbol', () => {
            expect(() => {
                new HourParser('%');
            }).to.throw();
        });
        it('errors with an unidentified symbol in a list', () => {
            expect(() => {
                new HourParser('1,5,%,*');
            }).to.throw();
        });
        it('creates with a range', () => {
            expect(() => {
                new HourParser('1-15');
            }).to.not.throw();
        });
        it('creates with a range and an any symbol', () => {
            expect(() => {
                new HourParser('1-*');
            }).to.not.throw();
        });
        it('creates with a list and a range', () => {
            expect(() => {
                new HourParser('2,5-10,12');
            }).to.not.throw();
        });
        it('creates with a list and a range and any symbol', () => {
            expect(() => {
                new HourParser('2,5-*,*');
            }).to.not.throw();
        });
        it('creates with a step', () => {
            expect(() => {
                new HourParser('1-10/2');
            }).to.not.throw();
        });
        it('creates with a step and any symbol in a range', () => {
            expect(() => {
                new HourParser('1-*/2');
            }).to.not.throw();
        });
        it('creates with a step and any symbol in a list', () => {
            expect(() => {
                new HourParser('15,20-23/2,*');
            }).to.not.throw();
        });
        it('creates with a step and any symbol', () => {
            expect(() => {
                new HourParser('*/10');
            }).to.not.throw();
        });
        it('rejects a step without a range', () => {
            expect(() => {
                new HourParser('5/10');
            }).to.throw();
        });
    });
});
