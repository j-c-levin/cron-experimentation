import { expect } from 'chai';
import { MinuteParser } from './minuteParser';
describe('Minute Parser', () => {
    describe('constructor()', () => {
        it('creates with the minimum value', () => {
            expect(() => {
                new MinuteParser('0');
            }).to.not.throw();
        });
        it('creates with the maximum value', () => {
            expect(() => {
                new MinuteParser('59');
            }).to.not.throw();
        });
        it('creates in the middle of the range', () => {
            expect(() => {
                new MinuteParser('15');
            }).to.not.throw();
        });
        it('errors below the minimum', () => {
            expect(() => {
                new MinuteParser('-1');
            }).to.throw();
        });
        it('errors above the maximum', () => {
            expect(() => {
                new MinuteParser('60');
            }).to.throw();
        });
        it('creates creates with a list', () => {
            expect(() => {
                new MinuteParser('1,2,3');
            }).to.not.throw();
        });
        it('errors with a list out of range', () => {
            expect(() => {
                new MinuteParser('-1,60');
            }).to.throw();
        });
        it('errors with a list both out and in range', () => {
            expect(() => {
                new MinuteParser('0,15,60');
            }).to.throw();
        });
        it('creates with an any symbol', () => {
            expect(() => {
                new MinuteParser('*');
            }).to.not.throw();
        });
        it('creates with a list with an any symbol', () => {
            expect(() => {
                new MinuteParser('1,5,*');
            }).to.not.throw();
        });
        it('errors with a list with an any symbol that is out of range', () => {
            expect(() => {
                new MinuteParser('1,5,*,60');
            }).to.throw();
        });
        it('errors with an unidentified symbol', () => {
            expect(() => {
                new MinuteParser('%');
            }).to.throw();
        });
        it('errors with an unidentified symbol in a list', () => {
            expect(() => {
                new MinuteParser('1,5,%,*');
            }).to.throw();
        });
        it('creates with a range', () => {
            expect(() => {
                new MinuteParser('1-15');
            }).to.not.throw();
        });
        it('creates with a range and an any symbol', () => {
            expect(() => {
                new MinuteParser('1-*');
            }).to.not.throw();
        });
        it('creates with a list and a range', () => {
            expect(() => {
                new MinuteParser('2,5-10,12');
            }).to.not.throw();
        });
        it('creates with a list and a range and any symbol', () => {
            expect(() => {
                new MinuteParser('2,5-*,*');
            }).to.not.throw();
        });
        it('creates with a step', () => {
            expect(() => {
                new MinuteParser('1-10/2');
            }).to.not.throw();
        });
        it('creates with a step and any symbol in a range', () => {
            expect(() => {
                new MinuteParser('1-*/2');
            }).to.not.throw();
        });
        it('creates with a step and any symbol in a list', () => {
            expect(() => {
                new MinuteParser('15,20-23/2,*');
            }).to.not.throw();
        });
        it('creates with a step and any symbol', () => {
            expect(() => {
                new MinuteParser('*/10');
            }).to.not.throw();
        });
        it('rejects a step without a range', () => {
            expect(() => {
                new MinuteParser('5/10');
            }).to.throw();
        });
    });
});
