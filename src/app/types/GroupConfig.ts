import { CommunicationObject } from './CommunicationObject';

export class GroupConfig {
    public active:boolean; // !< Configuration is active
    public readable:boolean; // !< Referenced com object is readable through group-id (Answers RTR-Messages)
    public writeable:boolean; // !< Referenced com object is writeable through group-id
    public listen:boolean; // !< Referenced com object takes value from other objects answers to RTR-Request on
                                    // this group-id
    public send:boolean; // !< Changes on referenced com object are send to group-id
    public comObj:CommunicationObject; // !< Internal parameter number of referenced com object
    public priority:string; // !< Priority for sent messages (answers are sent with request priority). Possible Values: SYSTEM,ALARM,HIGH,NORMAL
    public messageAddress:number; // !< Message-ID referenced to group
    public metaType:string; //!< Type of the communicated values
    public objectType:string; //!< Type of Object that is controled here

    public deviceId:number; //!< Device this configuration resides on



    constructor(comObj:CommunicationObject, groupCfg?:GroupConfig, prio?:string, msgAddr?:number, metaType?:string) {
        this.comObj = comObj;
        this.active = true;
        this.readable = false;
        this.writeable = !comObj.sensor;
        this.listen = false;
        this.send = false;
        this.priority = groupCfg && groupCfg.priority || prio;
        this.messageAddress = groupCfg && groupCfg.messageAddress || msgAddr;
        this.metaType = groupCfg && groupCfg.metaType || metaType;
        this.objectType = comObj.objectType;
        this.deviceId = comObj.deviceId;
    }
}