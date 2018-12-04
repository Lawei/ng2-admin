import {Component, OnInit} from '@angular/core';
import { Device } from '../../../types/Device';
import { RestDataService } from '../../../restdata.service';

@Component({
  selector: 'devices-table',
  providers: [RestDataService],
  templateUrl: './devicesTable.html'
})
export class DevicesTableComponent implements OnInit {

  updateImage:File = null;
  devicesTableData:Array<Device> = [];
  deviceSelection:Array<boolean> = [];
  loading:Boolean = false;
  public servererror:string = "";
  public serverresponse:string = "";
  
  constructor(private _dataService: RestDataService) {
  }
 
  ngOnInit() {
      //this.getDevices();
  }

  public getImage(type) {
      if(type == 'DEVICE_TYPE_SHUTTER4X')
        return 'app/smarthab/rollershutter-60.png';
      if(type == 'DEVICE_TYPE_SWITCH')
        return 'app/smarthab/wallswitch.png';
  }

  public onSubmit():void {
    let deviceIds:Array<number> = [];
    for(var i=0;i<this.devicesTableData.length;i++) { 
      if(!(this.deviceSelection[i]!=true)) {
        console.log('Update device '+this.devicesTableData[i].name);
        deviceIds.push(this.devicesTableData[i].id);
      }
    }
    let formData:FormData = new FormData();
    formData.append('devices', new Blob([JSON.stringify(deviceIds)], {
      type: "application/json"
    }),'devices');

    formData.append('file', this.updateImage);
    this.loading = true;
    this._dataService.UpdateDevice(formData).subscribe(
      response => {
        this.servererror = "";
        this.serverresponse = response.toString();
      },
      error => {
        this.servererror = "Error: "+error;
      },
      () => {
        console.log('Update finished');
        this.loading = false;
      }
    );
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      this.updateImage = fileList[0];
      let formData:FormData = new FormData();
      formData.append('file', this.updateImage); // , file.name
      this.loading = true;
      this._dataService.GetCompatibleDevices(formData).subscribe(
        (data:Device[]) => this.devicesTableData = data,
        error => {
          this.servererror = "Error: "+error;
        },
        () => {
          console.log('Got list of compatible Devices');
          this.loading = false;
        }
      );
    } 
}

/*
  private getDevices(): void {
      this._dataService
          .GetDeviceList()
          .subscribe((data:Device[]) => this.devicesTableData = data,
              error => console.log(error),
              () => {
                console.log('Get all Devices complete')
                this.deviceSelection = new Array(this.devicesTableData.length);
              });
        
  }
  */
}
