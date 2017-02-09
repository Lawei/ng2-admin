import {Component, OnInit} from '@angular/core';

import { RestDataService } from '../../../restdata.service';

@Component({
  selector: 'group-config',
  providers: [RestDataService],
  template: require('./groupConfig.html')
})
export class GroupConfigComponent implements OnInit {

  constructor(private _dataService: RestDataService) {}
 
  ngOnInit() {
  }

  private getGroup(): void {
      /*
      this._dataService
          .GetDeviceJunctions()
          .subscribe((data:Device[]) => this.devicesTableData = data,
              error => console.log(error),
              () => console.log('Get all Devices complete'));
              */
  }

}
