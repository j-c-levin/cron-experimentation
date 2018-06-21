import { MinuteParser } from './parsers/minuteParser';
// ask for input

// send to parser
const m = new MinuteParser('10/59');

// print out result
for (let i = 0; i < 60; i++) {
    if (m.match(i)) {
        console.log('matched', i);
    }
}