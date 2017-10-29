import {Component, OnInit} from '@angular/core';
import { Device } from '../../../types/Device';
import { RestDataService } from '../../../restdata.service';

@Component({
  selector: 'devices-table',
  providers: [RestDataService],
  templateUrl: './devicesTable.html'
})
export class DevicesTableComponent implements OnInit {

  rollerShutterImage = 'app/smarthab/rollershutter-60.png';

  devicesTableData:Array<Device>;

  constructor(private _dataService: RestDataService) {}
 
  ngOnInit() {
      this.getDevices();
  }

  public getImage(type) {
      if(type == 'DEVICE_TYPE_SHUTTER4X')
        return 'app/smarthab/rollershutter-60.png';
      if(type == 'DEVICE_TYPE_SWITCH')
        return 'app/smarthab/wallswitch.png';
  }

  public getDeviceConfigRouterLink(device:Device) {
    if(device.type == 'DEVICE_TYPE_SHUTTER4X')
      return ['/pages/devices/shutterconfig', device.id];
    if(device.type == 'DEVICE_TYPE_SWITCH')
      return ['/pages/devices/switchconfig', device.id];
  }

  getJunctionConfigRouterLink(device:Device) {
    return ['/pages/devices/junctionconfig', device.id];
  }

  private getDevices(): void {
      
      this._dataService
          .GetDeviceList()
          .subscribe((data:Device[]) => this.devicesTableData = data,
              error => console.log(error),
              () => console.log('Get all Devices complete'));
  }
}
