import { Device } from './Device';

export class ShutterDeviceChannel {
    public name: string;
    public move_time_short: number;
    public move_time_down: number;
    public move_time_up: number;
    public motor_sense_cfg: string;

    constructor(name, mt_short, mt_down, mt_up, sense_cfg) {
        this.name = name;
        this.move_time_short = mt_short;
        this.move_time_up = mt_up;
        this.move_time_down = mt_down;
        this.motor_sense_cfg = sense_cfg;
    }
}

export class ShutterDevice extends Device {
    public overdrive: number;
    public channels: Array<ShutterDeviceChannel>;

    constructor() {
        super();
        this.overdrive = 0;
        this.channels = [
            new ShutterDeviceChannel('channel1', 10, 1500, 1490, 'MOTOR_SENSE_ON'),
            new ShutterDeviceChannel('channel2', 20, 1500, 1490, 'MOTOR_SENSE_OFF'),
            new ShutterDeviceChannel('channel3', 30, 1500, 1490, 'MOTOR_SENSE_CALIBRATE'),
            new ShutterDeviceChannel('channel4', 40, 1500, 1490, 'MOTOR_SENSE_ON')];
    }
}
