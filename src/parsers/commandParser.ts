export class CommandParser {
    command: string;

    constructor(input: string[], commandIndex: number) {
        this.command = this.parseCommand(input, commandIndex);
    }

    // Construct the cron command by concatenating all the arguments after the day of the week command
    parseCommand(input: string[], commandIndex: number): string {
        return input.reduce((previous, current, index) => {
            return (index < commandIndex) ? previous : `${previous} ${current}`;
        }, '');
    }

    printCommand(): void {
        console.log('command     ', this.command);
    }
}
