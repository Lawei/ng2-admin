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
  public newGroupName:string = '';
  public servererror:string = '';

  constructor(private _dataService: RestDataService) {}
 
  ngOnInit() {
      this.getGroups();
  }

  getGroupConfigRouterLink(group:Group) {
    return ['/pages/groups/groupconfig', group.id];
  }

  public getImage(objectType) : string {
    switch(objectType) { 
      case 'TYPE_SHUTTER':
        return 'app/smarthab/rollershutter-60.png';
      default:
        return 'app/smarthab/unknown.png';
    }
  }

// TODO: Add function to delete Group directly from all devices!

  addNewGroup($event) {
    if (($event.which === 1 || $event.which === 13) && this.newGroupName.trim() != '') {
      this._dataService.AddGroup(this.newGroupName).subscribe(
        response => {
          this.servererror = "";
          this.getGroups();
        },
        error => {
          this.servererror = "Error: "+error;
        }
      )

      this.newGroupName = '';
    }
  }

  private getGroups(): void {
      this._dataService
          .GetGroupList()
          .subscribe((data:Group[]) => this.groupsTableData = data,
              error => console.log(error),
              () => console.log('Get all Groups complete'));
  }
}
