export class JunctionConfig {
    public active:boolean; // !< Configuration is active
    public readable:boolean; // !< Referenced com object is readable through group-id (Answers RTR-Messages)
    public writeable:boolean; // !< Referenced com object is writeable through group-id
    public listen:boolean; // !< Referenced com object takes value from other objects answers to RTR-Request on
                                    // this group-id
    public send:boolean; // !< Changes on referenced com object are send to group-id
    public communicationObj:number; // !< Internal parameter number of referenced com object
    public priority:string; // !< Priority for sent messages (answers are sent with request priority). Possible Values: SYSTEM,ALARM,HIGH,NORMAL
    public messageAddress:number; // !< Message-ID referenced to com object (Can be Group, Scene or Physical Address)
    public metaType:string; //!< Type of the communicated values
    public objectType:string; //!< Type of Object that is controled here

    constructor() {
    }
}