import { Component } from '@angular/core';


@Component({
    selector: 'devices',
    template: `<div class="widgets">

  <div class="row">
    <div class="col-xs-6">
      <ba-card title="Devices" baCardClass="table-panel">
        <devices-table></devices-table>
      </ba-card>
    </div>
  </div>

</div>`
})
export class DevicesComponent {
  constructor() {
  }
}