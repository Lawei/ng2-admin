import {Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestDataService } from '../restdata.service';
import { Shutter4xDevice, ShutterDeviceChannel } from '../Shutter4xDevice';

@Component({
  selector: 'shutter4x-config',
  providers: [RestDataService],
  template: require('./shutter4xConfig.html')
})
export class Shutter4xConfigComponent implements OnInit, OnDestroy {
  deviceConfig:Shutter4xDevice;

  public deviceId;
  private sub:any;

  public submitted:boolean = false;

  constructor(private _dataService: RestDataService, private route: ActivatedRoute) {
    this.deviceConfig = new Shutter4xDevice();
    console.log(this.deviceConfig);
  }
 
  ngOnInit() {
      this.sub = this.route.params.subscribe(params => {

          this.deviceId = params['id'];
      });
      //this.getDeviceConfig();
  }

  ngOnDestroy() {
    // Clean sub to avoid memory leak
    this.sub.unsubscribe();
  }

  public getImage(type) {
      if(type == 'DEVICE_TYPE_SHUTTER4X')
        return 'app/smarthab/rollershutter-60.png';
      if(type == 'DEVICE_TYPE_SWITCH')
        return 'app/smarthab/wallswitch.png';
  }

  private getDeviceConfig(): void {
      this._dataService
          .GetShutterDeviceConfig(this.deviceId)
          .subscribe((data:Shutter4xDevice) => this.deviceConfig = data,
              error => console.log(error),
              () => console.log('Get Shutter4xDevice config complete'));
  }

  public onSubmit():void {
    this.submitted = true;
    //if (this.form.valid) {
      // your code goes here
      console.log(this.deviceConfig);
    //}
  }

  
}
