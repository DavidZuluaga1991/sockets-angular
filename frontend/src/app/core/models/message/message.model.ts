export interface IMessage {
    author: string;
    message: string;
    date: Date;
}
export class Message implements IMessage {
    author: string;
    message: string;
    date: Date;
    constructor(message: IMessage) {
        this.author = message.author;
        this.message = message.message;
        this.date = message.date;
    }
}