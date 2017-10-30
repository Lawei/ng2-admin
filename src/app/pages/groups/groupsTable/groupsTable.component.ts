import {Component, OnInit} from '@angular/core';
import { Group } from '../../../types/Group';
import { RestDataService } from '../../../restdata.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModal } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'groups-table',
  providers: [RestDataService],
  templateUrl: './groupsTable.html'
})
export class GroupsTableComponent implements OnInit {

  groupsTableData:Array<Group>;
  public newGroupName:string = '';
  public servererror:string = '';

  constructor(private _dataService: RestDataService, private modalService: NgbModal) {}
 
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

  private deleteGroup(group:Group) {
    var res;
    const activeModal = this.modalService.open(ConfirmModal, {size: 'sm'});
    activeModal.componentInstance.modalHeader = 'Delete';
    activeModal.componentInstance.modalContent = 'Do you really want to delete Group "'+group.name+'"';
    activeModal.result.then((result) => {
      if(result === true) {
        this._dataService.UpdateGroupConfiguration(group.id, []).subscribe(
          response => {
              this.servererror = "";
              this.getGroups(); // Update group list
          },
          error => {
              this.servererror = "Error: "+error;
          }
      );
      }
      });
  }

  addNewGroup($event) {
    if (($event.which === 1 || $event.which === 13) && this.newGroupName.trim() != '') {
      this._dataService.AddGroup(this.newGroupName).subscribe(
        response => {
          this.servererror = "";
          this.getGroups(); // Update group list
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
