import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestDataService } from '../../../@core/utils/restdata.service';
import { ShutterDevice } from '../../../@core/data/ShutterDevice';

@Component({
  selector: 'ngx-shutter-config',
  providers: [RestDataService],
  templateUrl: './shutterConfig.html',
})
export class ShutterConfigComponent implements OnInit, OnDestroy {
  deviceConfig: ShutterDevice;

  public deviceId;
  private sub: any;
  public servererror: string;

  public submitted: boolean = false;

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
      .subscribe((data: ShutterDevice) => console.log(data), // this.deviceConfig = data,
      error => console.log('Error get ShutterDevice-Config:_' + error),
      () => console.log('Get ShutterDevice config for device ' + this.deviceConfig.name + ' complete'));
  }

  public cancelEdit(): void {
    this._router.navigateByUrl('pages/devices');
  }

  public onSubmit(): void {
    this.submitted = true;
    this._dataService.UpdateShutterDevieConfig(this.deviceId, this.deviceConfig).subscribe(
      response => {
        this.servererror = '';
        this._router.navigateByUrl('pages/devices');
      },
      error => {
        this.servererror = 'Error: ' + error;
      },
    );

  }
}
