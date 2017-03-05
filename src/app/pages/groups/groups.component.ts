import { Component } from '@angular/core';


@Component({
    selector: 'groups',
    template: `<div class="widgets">

  <div class="row">
    <div class="col-xs-6">
      <ba-card title="Groups Overview" baCardClass="table-panel">
        <groups-table></groups-table>
      </ba-card>
    </div>
  </div>

</div>`
})
export class GroupsComponent {
  constructor() {
  }
}