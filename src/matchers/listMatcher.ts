import { IMatcher, IParser } from '../interfaces';

export class ListMatcher implements IMatcher {

    private input: string[] = [''];

    public match(input: string): boolean {
        return true;
    }

    public isValid(input: string): boolean {
        if (input.includes(',')) {
            this.input = input.split(",");
            return true;
        }
        return false;
    }

    public getListChildren(parserType: any): IParser[] {
        return this.input.map((elementInput) => {
            return new parserType(elementInput);
        });
    }
}
