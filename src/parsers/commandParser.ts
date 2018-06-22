import { Parser } from '../interfaces';
export class CommandParser{
    command: string;

    constructor(input: string[], commandIndex: number) {
        this.command = this.parseCommand(input, commandIndex);
    }

    parseCommand(input: string[], commandIndex: number): string {
        let command = '';
        input.forEach((element, index) => {
            if (index < commandIndex) {
                return;
            }
            command += ` ${element}`;
        });
        return command;
    }

    printCommand(): void {
        console.log('command     ', this.command);
    }
}
