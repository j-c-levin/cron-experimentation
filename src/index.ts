import { MinuteParser } from './parsers/minuteParser';
import { HourParser } from './parsers/hourParser';
import { DayOfMonthParser } from './parsers/dayOfMonthParser';
import { MonthParser } from './parsers/monthParser';
// ask for input

// send to parser
const m = new MonthParser('jAn-dec/2');

// print out result
for (let i = 0; i < 60; i++) {
    if (m.match(i)) {
        console.log('matched', i);
    }
}