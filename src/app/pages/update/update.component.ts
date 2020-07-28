import { Component } from '@angular/core';


@Component({
    selector: 'ngx-update',
    template: `<div class="widgets">
  <div class="row">
    <div class="col-xs-6">
      <nb-card>
        <nb-card-header>Update device Firmware</nb-card-header>
        <nb-card-body>
          <ngx-devices-table></ngx-devices-table>
        </nb-card-body>
      </nb-card>
    </div>
  </div>

</div>`,
})
export class UpdateComponent {
  constructor() {
  }
}
