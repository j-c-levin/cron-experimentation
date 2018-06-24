import { expect } from 'chai';
import { MonthParser } from './monthParser';

describe('Month Parser', () => {
    describe('constructor()', () => {
        it('creates with the minimum value', () => {
            expect(() => {
                new MonthParser('1');
            }).to.not.throw();
        });
        it('creates with the maximum value', () => {
            expect(() => {
                new MonthParser('12');
            }).to.not.throw();
        });
        it('creates in the middle of the range', () => {
            expect(() => {
                new MonthParser('5');
            }).to.not.throw();
        });
        it('errors below the minimum', () => {
            expect(() => {
                new MonthParser('0');
            }).to.throw();
        });
        it('errors above the maximum', () => {
            expect(() => {
                new MonthParser('13');
            }).to.throw();
        });
        it('creates creates with a list', () => {
            expect(() => {
                new MonthParser('1,2,3');
            }).to.not.throw();
        });
        it('errors with a list out of range', () => {
            expect(() => {
                new MonthParser('0,13');
            }).to.throw();
        });
        it('errors with a list both out and in range', () => {
            expect(() => {
                new MonthParser('0,7,13');
            }).to.throw();
        });
        it('creates with an any symbol', () => {
            expect(() => {
                new MonthParser('*');
            }).to.not.throw();
        });
        it('creates with a list with an any symbol', () => {
            expect(() => {
                new MonthParser('1,5,*');
            }).to.not.throw();
        });
        it('errors with a list with an any symbol that is out of range', () => {
            expect(() => {
                new MonthParser('1,5,*,13');
            }).to.throw();
        });
        it('errors with an unidentified symbol', () => {
            expect(() => {
                new MonthParser('%');
            }).to.throw();
        });
        it('errors with an unidentified symbol in a list', () => {
            expect(() => {
                new MonthParser('1,5,%,*');
            }).to.throw();
        });
        it('creates with a range', () => {
            expect(() => {
                new MonthParser('1-7');
            }).to.not.throw();
        });
        it('creates with a range and an any symbol', () => {
            expect(() => {
                new MonthParser('1-*');
            }).to.not.throw();
        });
        it('creates with a list and a range', () => {
            expect(() => {
                new MonthParser('1,2-4,7');
            }).to.not.throw();
        });
        it('creates with a list and a range and any symbol', () => {
            expect(() => {
                new MonthParser('2,5-*,*');
            }).to.not.throw();
        });
        it('creates with a step', () => {
            expect(() => {
                new MonthParser('1-6/2');
            }).to.not.throw();
        });
        it('creates with a step and any symbol in a range', () => {
            expect(() => {
                new MonthParser('1-*/2');
            }).to.not.throw();
        });
        it('creates with a step and any symbol in a list', () => {
            expect(() => {
                new MonthParser('1,2-7/3,*');
            }).to.not.throw();
        });
        it('creates with a step and any symbol', () => {
            expect(() => {
                new MonthParser('*/10');
            }).to.not.throw();
        });
        it('rejects a step without a range', () => {
            expect(() => {
                new MonthParser('5/10');
            }).to.throw();
        });
        it('accepts jan as input', () => {
            expect(() => {
                new MonthParser('jan');
            }).to.not.throw();
        });
        it('accepts feb as input', () => {
            expect(() => {
                new MonthParser('feb');
            }).to.not.throw();
        });
        it('accepts mar as input', () => {
            expect(() => {
                new MonthParser('mar');
            }).to.not.throw();
        });
        it('accepts apr as input', () => {
            expect(() => {
                new MonthParser('apr');
            }).to.not.throw();
        });
        it('accepts may as input', () => {
            expect(() => {
                new MonthParser('may');
            }).to.not.throw();
        });
        it('accepts jun as input', () => {
            expect(() => {
                new MonthParser('jun');
            }).to.not.throw();
        });
        it('accepts jul as input', () => {
            expect(() => {
                new MonthParser('jul');
            }).to.not.throw();
        });
        it('accepts aug as input', () => {
            expect(() => {
                new MonthParser('aug');
            }).to.not.throw();
        });
        it('accepts sep as input', () => {
            expect(() => {
                new MonthParser('sep');
            }).to.not.throw();
        });
        it('accepts oct as input', () => {
            expect(() => {
                new MonthParser('oct');
            }).to.not.throw();
        });
        it('accepts nov as input', () => {
            expect(() => {
                new MonthParser('nov');
            }).to.not.throw();
        });
        it('accepts dec as input', () => {
            expect(() => {
                new MonthParser('dec');
            }).to.not.throw();
        });
        it('errors on non-month used', () => {
            expect(() => {
                new MonthParser('mon');
            }).to.throw();
        });
        it('accepts a range of months as input', () => {
            expect(() => {
                new MonthParser('jan-may');
            }).to.not.throw();
        });
        it('accepts a range of months and any symbols as input', () => {
            expect(() => {
                new MonthParser('mar-*');
            }).to.not.throw();
        });
        it('accepts a range of months and numbers as input', () => {
            expect(() => {
                new MonthParser('feb-5');
            }).to.not.throw();
        });
        it('errors on a range of months and numbers in the wrong order', () => {
            expect(() => {
                new MonthParser('jun-5');
            }).to.throw();
        });
        it('accepts a range of months and numbers in a list as input', () => {
            expect(() => {
                new MonthParser('feb-5,7');
            }).to.not.throw();
        });
        it('errors on non-month used in a list', () => {
            expect(() => {
                new MonthParser('jan, mon');
            }).to.throw();
        });
        it('errors on non-month used in a range', () => {
            expect(() => {
                new MonthParser('tue-febr');
            }).to.throw();
        });
    });
});
