import { MinuteParser } from './parsers/minuteParser';
import { HourParser } from './parsers/hourParser';
import { DayOfMonthParser } from './parsers/dayOfMonthParser';
import { MonthParser } from './parsers/monthParser';
import { DayOfWeekParser } from './parsers/dayOfWeekParser';
import { CommandParser } from './parsers/commandParser';

const index = {
    minute: 2,
    hour: 3,
    dayOfMonth: 4,
    month: 5,
    dayOfWeek: 6,
    command: 7
};
const maxParserNumber = 60;

// Ask for input
const args = process.argv;

// Send to parser
const parsers = [
    new MinuteParser(args[index.minute]),
    new HourParser(args[index.hour]),
    new DayOfMonthParser(args[index.dayOfMonth]),
    new MonthParser(args[index.month]),
    new DayOfWeekParser(args[index.dayOfWeek])
];

// Print out result
parsers.forEach(parser => {
    let message = parser.name;
    for (let i = 0; i < maxParserNumber; i++) {
        if (parser.match(i)) {
            message += ` ${i}`;
        }
    }
    console.log(message);
});
// Print out the command at the end
new CommandParser(args, index.command).printCommand();