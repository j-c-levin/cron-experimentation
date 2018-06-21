import { MinuteParser } from './minuteParser';
// ask for input

// send to parser
const m = new MinuteParser('20,0-2,3,55-56');

// print out result
for (let i = 0; i < 60; i++) {
    if (m.match(i)) {
        console.log('matched', i);
    }
}