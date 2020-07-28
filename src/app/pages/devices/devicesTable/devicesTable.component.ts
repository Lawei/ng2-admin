import {Component, OnInit} from '@angular/core';
import { Device } from '../../../@core/data/Device';
import { RestDataService } from '../../../@core/utils/restdata.service';
import { Configuration } from '../../../app.constants';

@Component({
  selector: 'ngx-devices-table',
  providers: [RestDataService, Configuration],
  templateUrl: './devicesTable.html',
})
export class DevicesTableComponent implements OnInit {

  rollerShutterImage = this._configuration.ImagesDir + '/smarthab/rollershutter-60.png';
  wallswitchImage = this._configuration.ImagesDir + '/smarthab/wallswitch.png';

  devicesTableData: Array<Device>;

  constructor(private _dataService: RestDataService, private _configuration: Configuration) {}

  ngOnInit() {
      this.getDevices();
  }

  public getImage(type) {
      if (type === 'DEVICE_TYPE_SHUTTER4X')
        return this.rollerShutterImage;
      if (type === 'DEVICE_TYPE_SWITCH')
        return this.wallswitchImage;
  }

  public getDeviceConfigRouterLink(device: Device) {
    if (device.type === 'DEVICE_TYPE_SHUTTER4X')
      return ['/pages/devices/shutterconfig', device.id];
    if (device.type === 'DEVICE_TYPE_SWITCH')
      return ['/pages/devices/switchconfig', device.id];
  }

  getJunctionConfigRouterLink(device: Device) {
    return ['/pages/devices/junctionconfig', device.id];
  }

  private getDevices(): void {

      this._dataService
          .GetDeviceList()
          .subscribe((data: Device[]) => this.devicesTableData = data,
              error => console.log(error),
              () => console.log('Get all Devices complete'));
  }
}
