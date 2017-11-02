import { CommunicationObject } from './CommunicationObject';

export class SceneConfig {
    public active:boolean; // !< Configuration is active
    public sceneId:number;
    public comObj:CommunicationObject; // !< Internal parameter number of referenced com object
    //public dataType:string;
    public deviceId:number; //!< Device this configuration resides on
    public value:number;

    constructor(sceneId:number, comObj:CommunicationObject) {
        this.active = true;
        this.sceneId = sceneId;
        this.comObj = comObj;
        this.deviceId = comObj.deviceId;
        this.value = 0;
    }
}