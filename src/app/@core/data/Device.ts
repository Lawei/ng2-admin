export class Device {
    public id: number;
    public type: string;
    public version: number;
    public name: string;

    constructor() {
        this.id = 0;
        this.type = 'UNKNOWN_TYPE';
        this.version = 0;
        this.name = 'unknown';
    }
}
