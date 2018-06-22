import { MinuteParser } from './parsers/minuteParser';
import { HourParser } from './parsers/hourParser';
// ask for input

// send to parser
const m = new HourParser('*-*');

// print out result
for (let i = 0; i < 60; i++) {
    if (m.match(i)) {
        console.log('matched', i);
    }
}