import { IMatcher } from "../interfaces";

// The default matcher for parser classes, does not match anything
export class NoMatcher implements IMatcher {

    public match(): boolean {
        return false;
    }

    public isValid(): boolean {
        return false;
    }
}
