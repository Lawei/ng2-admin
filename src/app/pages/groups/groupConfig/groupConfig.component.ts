import {Component, OnInit, HostListener} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestDataService } from '../../../restdata.service';
import { GroupConfig } from '../../../types/GroupConfig';
import { CommunicationObject } from '../../../types/CommunicationObject';
import { Device } from '../../../types/Device';

@Component({
  selector: 'group-config',
  providers: [RestDataService],
  template: require('./groupConfig.html')
})
export class GroupConfigComponent implements OnInit {
    private sub:any;
    public groupId:number;
    private groupConfigData:Array<GroupConfig>;
    private compatibleComObjs:Array<CommunicationObject>;
    private devices : { [key:number]:Device; } = {};
    private servererror:string;
    public submitted:boolean = false;

    private selectedAddSensor:number = -1;

    advanced: boolean = false;
    
    constructor(private _dataService: RestDataService, private _route: ActivatedRoute, private _router: Router) {}

    ngOnInit() {
        this.sub = this._route.params.subscribe(params => {
            this.groupId = parseInt(params['id'], 10);
        });
        this.getGroupConfig();
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

    private removeComObj(groupConfigIndex:number) {
        if(groupConfigIndex in this.groupConfigData) {
            if(this.compatibleComObjs.indexOf(this.groupConfigData[groupConfigIndex].comObj) === -1) {
                this.compatibleComObjs.push(this.groupConfigData[groupConfigIndex].comObj);
            }
            this.groupConfigData.splice(groupConfigIndex,1);
        }
    }

    private addComObject(objId:number) {
        if(objId in this.compatibleComObjs) {
            console.log('Add comobj '+this.compatibleComObjs[objId].name);
            if(this.groupConfigData.length > 0) {
                this.groupConfigData.push(new GroupConfig(this.compatibleComObjs[objId],this.groupConfigData[0]));
                this.compatibleComObjs.splice(objId,1); // remove added object
            } else {
                // First element to be added. Determine MetaType!
                var type = this.compatibleComObjs[objId].valueType;
                this.groupConfigData.push(new GroupConfig(this.compatibleComObjs[objId], null, 'NORMAL', this.groupId, type));
                this.compatibleComObjs.splice(objId,1); // remove added object
                // remove all objects not fitting type anymore
                for (var i = this.compatibleComObjs.length - 1; i >= 0; i--) {
                    if (this.compatibleComObjs[i].valueType !== type) {
                        this.compatibleComObjs.splice(i, 1);
                    }
                }
            }
            
            
        } else {
            console.log('Unknown obj: '+objId);
        }
    }

    public cancelEdit():void {
        this._router.navigateByUrl('pages/groups');
    }

    public onSubmit():void {
        this.submitted = true;
        this._dataService.UpdateGroupConfiguration(this.groupId, this.groupConfigData).subscribe(
            response => {
                this.servererror = "";
                this._router.navigateByUrl('pages/groups');
            },
            error => {
                this.servererror = "Error: "+error;
            }
        );
    } 

    private getGroupConfig(): void {
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
                    .GetGroupConfiguration(this.groupId)
                    .subscribe((data:GroupConfig[]) => this.groupConfigData = data,
                    error => console.log(error),
                    () => {
                        this._dataService
                            .GetCompatibleComObjects(this.groupId)
                            .subscribe((data:CommunicationObject[]) => this.compatibleComObjs = data,
                            error => console.log(error),
                            () => {
                                console.log('Get communication objects for group complete: ');
                            });
                    });
            });
    }

}
