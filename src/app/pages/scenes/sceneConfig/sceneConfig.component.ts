import {Component, OnInit, HostListener} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestDataService } from '../../../restdata.service';
import { SceneConfig } from '../../../types/SceneConfig';
import { CommunicationObject } from '../../../types/CommunicationObject';
import { Device } from '../../../types/Device';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InputValueModal } from '../../modals/inputValue-modal/inputValue-modal.component';
import { EnumSelectModal } from '../../modals/enumSelect-modal/enumSelect-modal.component';

@Component({
  selector: 'scene-config',
  providers: [RestDataService],
  templateUrl: './sceneConfig.html'
})
export class SceneConfigComponent implements OnInit {
    private sub:any;
    public sceneId:number;
    public sceneConfigData:Array<SceneConfig>;
    public compatibleComObjs:Array<CommunicationObject>;
    private devices : { [key:number]:Device; } = {};
    public servererror:string;
    public submitted:boolean = false;
  
    constructor(private _dataService: RestDataService, private _route: ActivatedRoute, private _router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.sub = this._route.params.subscribe(params => {
            this.sceneId = parseInt(params['id'], 10);
        });
        this.getSceneConfig();
    }

    ngOnDestroy() { // Clean sub to avoid memory leak
        this.sub.unsubscribe();
    }
    
    private getDeviceName(deviceId:number) {
        if(deviceId in this.devices)
            return this.devices[deviceId].name;
        return 'Unknown-Device-'+deviceId;
    }

    public getImage(deviceId:number) : string {
        if(deviceId in this.devices) {
            switch(this.devices[deviceId].type) {
            case 'DEVICE_TYPE_SHUTTER4X':
                return 'app/smarthab/rollershutter-60.png';
            case 'DEVICE_TYPE_SWITCH':
                return 'app/smarthab/wallswitch.png';
            default:
                return 'app/smarthab/unknown.png';
            }
        }
        return '';
    }

    private removeComObj(sceneConfigIndex:number) {
        if(sceneConfigIndex in this.sceneConfigData) {
            if(this.compatibleComObjs.indexOf(this.sceneConfigData[sceneConfigIndex].comObj) === -1) {
                this.compatibleComObjs.push(this.sceneConfigData[sceneConfigIndex].comObj);
            }
            this.sceneConfigData.splice(sceneConfigIndex,1);
        }
    }

    private addComObject(objId:number) {
        if(objId in this.compatibleComObjs) {
            console.log('Add comobj '+this.compatibleComObjs[objId].name);
            this.sceneConfigData.push(new SceneConfig(this.sceneId, this.compatibleComObjs[objId]));
            this.compatibleComObjs.splice(objId,1); // remove added object from list of objects that can be added
        } else {
            console.log('Unknown obj: '+objId);
        }
    }

    private valueString(scfg:SceneConfig) {
        switch(scfg.comObj.valueType) {
            case "TYPE_SHUTTER_STATE": {
                switch(scfg.value) {
                    case 0: return "STOP";
                    case 1: return "UP";
                    case 2: return "DOWN";
                    case 3: return "STEP UP";
                    case 4: return "STEP DOWN";
                }
            }
            break;
            default: 
                return scfg.value;
        }
    }

    private editValue(scfg:SceneConfig) {
        switch(scfg.comObj.valueType) {
            case "TYPE_SHUTTER_STATE": {
                const activeModal = this.modalService.open(EnumSelectModal, {size: 'lg'});
                activeModal.componentInstance.modalHeader = 'New Value';
                activeModal.componentInstance.modalValue = scfg.value;
                activeModal.componentInstance.modalValues = [
                    "STOP - Stop current movement",           // Value = 0
                    "UP - Move shutter to UP Position",       // Value = 1
                    "DOWN - Move shutter to DOWN Position",   // Value = 2
                    "STEP UP - Move shutter one step up",     // Value = 3
                    "STEP DOWN - Move shutter one step down"  // Value = 4
                ];
                activeModal.result.then((result) => {
                if(result !== null) {
                    scfg.value = result;
                }
                });
            }
            break;
            case "TYPE_NUMBER": {
                const activeModal = this.modalService.open(InputValueModal, {size: 'sm'});
                activeModal.componentInstance.modalHeader = 'New Value';
                activeModal.componentInstance.modalValue = scfg.value;
                activeModal.componentInstance.modalMinValue = 0;
                activeModal.componentInstance.modalMaxValue = 255;
                activeModal.result.then((result) => {
                if(result !== null) {
                    scfg.value = result;
                }
                });
            }
            break;
        }

      }

    public cancelEdit():void {
        this._router.navigateByUrl('pages/scenes');
    }

    public onSubmit():void {
        this.submitted = true;
        this._dataService.UpdateSceneConfiguration(this.sceneId, this.sceneConfigData).subscribe(
            response => {
                this.servererror = "";
                this._router.navigateByUrl('pages/scenes');
            },
            error => {
                this.servererror = "Error: "+error;
            }
        );
    } 

    private getSceneConfig(): void {
        let devices:Array<Device>;
        this._dataService
            .GetDeviceList()
            .subscribe((data:Device[]) => devices = data,
            error => console.log(error),
            () => {
                for(let d of devices) {
                    this.devices[d.id] = d;
                }
                this._dataService
                    .GetSceneConfiguration(this.sceneId)
                    .subscribe((data:SceneConfig[]) => this.sceneConfigData = data,
                    error => console.log(error),
                    () => {
                        this._dataService
                            .GetCompatibleSceneObjects(this.sceneId)
                            .subscribe((data:CommunicationObject[]) => this.compatibleComObjs = data,
                            error => console.log(error),
                            () => {
                                console.log('Get communication objects for scene complete');
                            });
                    });
            });
    }

}
