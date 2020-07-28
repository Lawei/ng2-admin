import { Component } from '@angular/core';


@Component({
    selector: 'ngx-devices',
    template: `<div class="widgets">

  <div class="row">
    <div class="col-xs-6">
      <nb-card>
        <nb-card-header>Devices</nb-card-header>
        <nb-card-body>
          <ngx-devices-table></ngx-devices-table>
        </nb-card-body>
      </nb-card>
    </div>
  </div>

</div>`,
})
export class DevicesComponent {
  constructor() {
  }
}
