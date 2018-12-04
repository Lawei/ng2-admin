import { Component } from '@angular/core';


@Component({
    selector: 'update',
    template: `<div class="widgets">
  <div class="row">
    <div class="col-xs-6">
      <ba-card title="Update device Firmware" baCardClass="table-panel">
        <devices-table></devices-table>
      </ba-card>
    </div>
  </div>

</div>`
})
export class UpdateComponent {
  constructor() {
  }
}