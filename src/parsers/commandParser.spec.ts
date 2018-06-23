import { expect } from 'chai';
import { CommandParser } from './commandParser';

describe('Command Parser', () => {
    describe('parseCommand()', () => {
        it('parses a command array', () => {
            const input = ["hello", "world"];
            const testParser = new CommandParser(input, 0);
            expect(testParser.getCommand()).to.equal('hello world');
        });
        it('starts at the correct index', () => {
            const input = ["skip", "this", "hello", "world"];
            const testParser = new CommandParser(input, 2);
            expect(testParser.getCommand()).to.equal('hello world');
        });
    });
});
