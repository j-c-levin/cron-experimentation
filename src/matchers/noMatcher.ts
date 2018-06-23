import { Matcher } from "../interfaces";

// The default matcher for parser classes, does not match anything
export class NoMatcher implements Matcher {

    public match(): boolean {
        return false;
    }

    public isValid(): boolean {
        return false;
    }
}
