import { Matcher, MatcherProperties } from '../interfaces';

const index = {
    start: 0,
    end: 1
}

export class AnyMatcher implements Matcher {
    properties: MatcherProperties;

    constructor() {
        this.properties = { minValue: -1, maxValue: -1 };
    }

    match(input: number): boolean {
        return (typeof this.properties.step !== 'undefined') ? input % this.properties.step === 0 : true;
    }

    isValid(input: string): boolean {
        // Check for step
        if (input.includes('/')) {
            // Split and save the step range
            const temp = input.split('/');
            // Check value is any is a whole number
            if (isNaN(Number(temp[index.end])) || temp[index.end].includes('.')) {
                throw new Error(`/step value in ${input} is not a valid integer`);
            }
            // Save the step into the matcher properties
            this.properties.step = Number(temp[index.end]);
            // Overwrite the start
            input = temp[index.start];
        }
        // Is input '*'
        return input === '*';
    }
}