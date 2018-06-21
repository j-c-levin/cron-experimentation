import { Matcher } from "../interfaces";

// The default matcher for parser classes, does not match anything
export class NoMatcher implements Matcher {

    constructor() { }

    match(): boolean {
        return false;
    }

    isValid(): boolean {
        return false
    }
}