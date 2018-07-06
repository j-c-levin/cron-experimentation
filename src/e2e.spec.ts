import { expect } from "chai";
import { HourParser } from "./parsers/hourParser";

describe.only('e2e', () => {
    it('runs an hour parser as expected', () => {
        // Create an hour parser from a specific string
        const hourParser = new HourParser('*/6');
        // const value for what the output should be
        const expected = ' 0 6 12 18';
        // iterate over to get matches
        let message = '';
        for (let i = 0; i < 24; i++) {
            if (hourParser.match(i)) {
                message += ` ${i}`;
            }
        }
        // Match output with const value
        expect(message).to.equal(expected);
    });
    it('erros as expected', () => {
        expect(() => { new HourParser('1,20,23-30'); }).to.throw();
    });
});
