export class MinuteParser {
    maxValue = 59;
    minValue = 0;
    value: string | null = null;

    constructor(input: string) {
        this.splitDataString(input);
    }
    todo
    // create an interface for all data type classes that can handle 'matches' and this is stored in the minute parser and this is what is called to validate a match
    splitDataString(input: string): void {

        // Input is a range, ....

        // Input as an asterix, matches with any value
        if (input === '*') {
            this.value = input;
            return;
        }

        // Input is a raw number, matches with specific value
        if (this.isValidNumber(input)) {
            this.value = input;
            return;
        }

        // Input matches no known type, throw error
        throw new Error(`Input ${input} as a minute does not match any known type`);
    }

    isValidNumber(input: string): boolean {
        // Input does not parse to a number
        if (isNaN(Number(input))) {
            return false;
        }
        // Input is not in a valid range
        if (Number(input) < this.minValue || Number(input) > this.maxValue) {
            throw new Error(`Value ${input} as a minute is out of the range of ${this.minValue} to ${this.maxValue}`);
        }
        // Input is not an integer
        if (input.includes('.')) {
            throw new Error(`Value ${input} as a minute is not a whole number between ${this.minValue} and ${this.maxValue}`);
        }
        return true;
    }
}