import { Matcher, MatcherProperties } from '../interfaces';
import { StepMatcher } from './stepMatcher';

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
        const stepResponse = StepMatcher.parse(input);
        if (stepResponse.hasStep) {
            if (typeof stepResponse.mainValue === 'undefined' || typeof stepResponse.stepValue === 'undefined') {
                throw new Error(`Step response for ${input} is true but there is no main or step value, this is a developer error`);
            }
            this.properties.step = stepResponse.stepValue;
            input = stepResponse.mainValue;
        }
        // Is input '*'
        return input === '*';
    }
}