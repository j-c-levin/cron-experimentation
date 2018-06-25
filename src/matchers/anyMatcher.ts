import { IMatcher, IMatcherProperties } from '../interfaces';
import { StepMatcher } from './stepMatcher';

export class AnyMatcher implements IMatcher {
    private properties: IMatcherProperties;

    constructor(properties: IMatcherProperties) {
        this.properties = properties;
    }

    public match(input: number): boolean {
        let step = true;
        // If a step has been specified, test if the input is a multiple
        if (typeof this.properties.step !== 'undefined') {
            step = input % this.properties.step === 0;
        }
        const match = input >= this.properties.minValue && input <= this.properties.maxValue;
        return match && step;
    }

    public isValid(input: string): boolean {
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
