export class CommandParser {
    private command: string;

    constructor(input: string[], commandIndex: number) {
        this.command = this.parseCommand(input, commandIndex);
    }

    // Construct the cron command by concatenating all the arguments after the day of the week command
    public parseCommand(input: string[], commandIndex: number): string {
        return input.reduce((previous, current, index) => {
            return (index < commandIndex) ? previous : `${previous} ${current}`;
        }, '');
    }

    public getCommand(): string {
        return this.command.trim();
    }
}
