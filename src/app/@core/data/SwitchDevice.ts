import { Device } from './Device';

export class SwitchDeviceButton {
    public name: string;
    /* Possible Value for func:
        SWITCH_FUNCT_SWITCH, SWITCH_FUNCT_DIMM, SWITCH_FUNCT_SHUTTER, SWITCH_FUNCT_VALUE, SWITCH_FUNCT_SCENE
    */
    public func: string;
    /* Possible Values for led:
        NONE (button has no led), OFF(led shall not be used), DEFAULT(default LED useage)
    */
    public led: string;
    public disabled: boolean;

    /* Configuration elements for function SWITCH_FUNCT_SWITCH */
    public sw_press_en: boolean;
    public sw_release_en: boolean;
    /* Possible Values for sw_cmd_press:
        SWITCH_MODE_OFF, SWITCH_MODE_ON, SWITCH_MODE_TOGGLE
    */
    public sw_cmd_press: string;
    /* Possible Values for sw_cmd_release:
        SWITCH_MODE_OFF, SWITCH_MODE_ON, SWITCH_MODE_TOGGLE
    */
    public sw_cmd_release: string;

    /* Configuration elements for function SWITCH_FUNCT_SHUTTER */
    /* Possible Values for shutter_mode:
        SWITCH_SHUTTER_MODE_SLS, SWITCH_SHUTTER_MODE_LS, SWITCH_SHUTTER_MODE_SL, SWITCH_SHUTTER_MODE_LSS
    */
    public shutter_mode: string;
    /* Possible Values for shutter_dir:
        SWITCH_DIRECTION_UP, SWITCH_DIRECTION_DOWN
    */
    public shutter_dir: string;
    public shutter_time: number;

    /* Configuration elements for function SWITCH_FUNCT_SZENE */
    public sceneid: number;
}

export class SwitchDevice extends Device {
    public buttons: Array<SwitchDeviceButton>;

    constructor() {
        super();
    }
}
