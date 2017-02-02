import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestDataService } from '../restdata.service';
import { ShutterDevice, ShutterDeviceChannel } from '../ShutterDevice';
import { Response, Headers } from '@angular/http';

@Component({
  selector: 'shutter-config',
  providers: [RestDataService],
  template: require('./shutterConfig.html')
})
export class ShutterConfigComponent implements OnInit, OnDestroy {
  deviceConfig:ShutterDevice;

  public deviceId;
  private sub:any;
  private servererror:string;

  public submitted:boolean = false;

  constructor(private _dataService: RestDataService, private _route: ActivatedRoute, private _router: Router) {
    this.deviceConfig = new ShutterDevice();
    console.log(this.deviceConfig);
  }
 
  ngOnInit() {
      this.sub = this._route.params.subscribe(params => {

          this.deviceId = params['id'];
      });
      this.getDeviceConfig();
  }

  ngOnDestroy() {
    // Clean sub to avoid memory leak
    this.sub.unsubscribe();
  }

  private getDeviceConfig(): void {
      this._dataService
          .GetShutterDeviceConfig(this.deviceId)
          .subscribe((data:ShutterDevice) => this.deviceConfig = data,
              error => console.log(error),
              () => console.log('Get ShutterDevice config complete'));
  }

  public cancelEdit():void {
    this._router.navigateByUrl('pages/devices');
  }

  public onSubmit():void {
    this.submitted = true;
    this._dataService.UpdateShutterDevieConfig(this.deviceId, this.deviceConfig).subscribe(
      response => {
        this.servererror = "";
        this._router.navigateByUrl('pages/devices');
      },
      error => {
        this.servererror = "Error: "+error;
      }
    );
    
  }  
}
