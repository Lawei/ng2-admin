import { Component } from '@angular/core';


@Component({
    selector: 'scenes',
    template: `<div class="widgets">
  <div class="row">
    <div class="col-xs-6">
      <ba-card title="Scenes Overview" baCardClass="table-panel">
        <scenes-table></scenes-table>
      </ba-card>
    </div>
  </div>

</div>`
})
export class ScenesComponent {
  constructor() {
  }
}