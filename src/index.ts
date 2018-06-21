import { MinuteParser } from './minuteParser';
// ask for input

// send to parser
const m = new MinuteParser('0-10/9');

// print out result
for (let i = 0; i < 60; i++) {
    if (m.match(i)) {
        console.log('matched', i);
    }
}