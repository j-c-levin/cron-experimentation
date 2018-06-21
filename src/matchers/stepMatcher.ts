const index = {
    start: 0,
    end: 1
}

export interface StepResponse {
    hasStep: boolean;
    stepValue?: number;
    mainValue?: string;
}

export class StepMatcher {
    static parse(input: string): StepResponse {
        if (input.includes('/') === false) {
            return { hasStep: false };
        }
        // Split and save the step range
        const temp = input.split('/');
        // Check value is any is a whole number
        if (isNaN(Number(temp[index.end])) || temp[index.end].includes('.')) {
            throw new Error(`/step value in ${input} is not a valid integer`);
        }
        return { hasStep: true, stepValue: Number(temp[index.end]), mainValue: temp[index.start] };
    }
}