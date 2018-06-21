import { Matcher } from "../interfaces";

export class AnyMatcher implements Matcher {

    constructor() { }

    match(input: number): boolean {
        return true;
    }

    isValid(input: string): boolean {
        // Is input '*'
        return input === '*';
    }
}