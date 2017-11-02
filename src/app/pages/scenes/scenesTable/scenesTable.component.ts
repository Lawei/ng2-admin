import {Component, OnInit} from '@angular/core';
import { Scene } from '../../../types/Scene';
import { RestDataService } from '../../../restdata.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModal } from '../../modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'scenes-table',
  providers: [RestDataService],
  templateUrl: './scenesTable.html'
})
export class ScenesTableComponent implements OnInit {

  scenesTableData:Array<Scene>;
  public newSceneName:string = '';
  public servererror:string = '';

  constructor(private _dataService: RestDataService, private modalService: NgbModal) {}
 
  ngOnInit() {
      this.getScenes();
  }

  getSceneConfigRouterLink(scene:Scene) {
    return ['/pages/scenes/sceneconfig', scene.id];
  }

  private deleteScene(scene:Scene) {
    var res;
    const activeModal = this.modalService.open(ConfirmModal, {size: 'sm'});
    activeModal.componentInstance.modalHeader = 'Delete';
    activeModal.componentInstance.modalContent = 'Do you really want to delete Scene "'+scene.name+'"';
    activeModal.result.then((result) => {
      if(result === true) {
        this._dataService.UpdateSceneConfiguration(scene.id, []).subscribe(
          response => {
              this.servererror = "";
              this.getScenes(); // Update scene list
          },
          error => {
              this.servererror = "Error: "+error;
          }
      );
      }
      });
  }

  addNewScene($event) {
    if (($event.which === 1 || $event.which === 13) && this.newSceneName.trim() != '') {
      this._dataService.AddScene(this.newSceneName).subscribe(
        response => {
          this.servererror = "";
          this.getScenes(); // Update scene list
        },
        error => {
          this.servererror = "Error: "+error;
        }
      )

      this.newSceneName = '';
    }
  }

  private getScenes(): void {
      this._dataService
          .GetSceneList()
          .subscribe((data:Scene[]) => this.scenesTableData = data,
              error => console.log(error),
              () => console.log('Get all Scenes complete'));
  }
}
