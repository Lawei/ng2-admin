import { Device } from './Device';

export class SwitchDeviceButton {
	 public name:string;
	 public func:string; // Possible Values: SWITCH_FUNCT_SWITCH, SWITCH_FUNCT_DIMM, SWITCH_FUNCT_SHUTTER, SWITCH_FUNCT_VALUE, SWITCH_FUNCT_SZENE
	 
	 /* Configuration elements for function SWITCH_FUNCT_SWITCH */
	 public sw_press_en:boolean;
	 public sw_release_en:boolean;
	 public sw_cmd_press:string;  // Possible Values: SWITCH_MODE_OFF, SWITCH_MODE_ON, SWITCH_MODE_TOGGLE
	 public sw_cmd_release:string; // Possible Values: SWITCH_MODE_OFF, SWITCH_MODE_ON, SWITCH_MODE_TOGGLE
	 
	 /* Configuration elements for function SWITCH_FUNCT_SHUTTER */
	 public shutter_mode:string; // Possible Values: SWITCH_SHUTTER_MODE_SLS, SWITCH_SHUTTER_MODE_LS, SWITCH_SHUTTER_MODE_SL, SWITCH_SHUTTER_MODE_LSS
	 public shutter_dir:string; // Possible Values: SWITCH_DIRECTION_UP, SWITCH_DIRECTION_DOWN
	 public shutter_time:number;
	 
	 /* Configuration elements for function SWITCH_FUNCT_SZENE */
	 public sceneid:number;
}

export class SwitchDevice extends Device{
    public buttons:Array<SwitchDeviceButton>;
    
    constructor() {
        super();
    }
}