import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestDataService } from '../restdata.service';
import { SwitchDevice, SwitchDeviceButton } from '../SwitchDevice';
import { Response, Headers } from '@angular/http';

@Component({
  selector: 'switch-config',
  providers: [RestDataService],
  template: require('./switchConfig.html')
})
export class SwitchConfigComponent implements OnInit, OnDestroy {
  deviceConfig:SwitchDevice;

  public deviceId;
  private sub:any;
  private servererror:string;

  public selectedButton:number = 0;

  public submitted:boolean = false;

  constructor(private _dataService: RestDataService, private _route: ActivatedRoute, private _router: Router) {
    this.deviceConfig = new SwitchDevice();
    console.log(this.deviceConfig);
  }
 
  ngOnInit() {
      this.sub = this._route.params.subscribe(params => {
          this.deviceId = params['id'];
      });
      this.getDeviceConfig();
  }

  ngOnDestroy() { // Clean sub to avoid memory leak
    this.sub.unsubscribe();
  }

  private getDeviceConfig(): void {
      this._dataService
          .GetSwitchDeviceConfig(this.deviceId)
          .subscribe((data:SwitchDevice) => this.deviceConfig = data,
              error => console.log(error),
              () => console.log('Get SwitchDevice config complete'));
  }

  public cancelEdit():void {
    this._router.navigateByUrl('pages/devices');
  }

  public onSubmit():void {
    this.submitted = true;
    this._dataService.UpdateSwitchDevieConfig(this.deviceId, this.deviceConfig).subscribe(
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
