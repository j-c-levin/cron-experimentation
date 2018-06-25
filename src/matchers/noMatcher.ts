import { IMatcher } from "../interfaces";

// A utility matcher that never matches, used for when matching is intended to be handled by child matchers
export class NoMatcher implements IMatcher {

    public match(): boolean {
        return false;
    }

    public isValid(): boolean {
        return false;
    }
}
