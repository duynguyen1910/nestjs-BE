
export class ResponseData<T> {
    statusCode: number;
    message: string;
    data: T | T[];
    error?: string;
    timestamp: string;

    constructor(statusCode: number, message: string, data: T | T[], error?: string) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.error = error;
        this.timestamp = new Date().toISOString();

        return this;
    }
}