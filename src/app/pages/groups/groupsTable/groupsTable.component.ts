import {Component, OnInit} from '@angular/core';
import { Group } from '../../../types/Group';
import { RestDataService } from '../../../restdata.service';

@Component({
  selector: 'groups-table',
  providers: [RestDataService],
  template: require('./groupsTable.html')
})
export class GroupsTableComponent implements OnInit {

  groupsTableData:Array<Group>;

  constructor(private _dataService: RestDataService) {}
 
  ngOnInit() {
      this.getGroups();
  }

  getGroupConfigRouterLink(group:Group) {
    return ['/pages/groups/groupconfig', group.id];
  }

  private getGroups(): void {
      this._dataService
          .GetGroupList()
          .subscribe((data:Group[]) => this.groupsTableData = data,
              error => console.log(error),
              () => console.log('Get all Groups complete'));
  }
}
